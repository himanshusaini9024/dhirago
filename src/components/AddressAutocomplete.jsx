"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

let mapsLoaderPromise = null;

function loadPlacesLibrary() {
  if (!API_KEY) {
    return Promise.reject(new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"));
  }

  if (!mapsLoaderPromise) {
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
      libraries: ["places"],
      region: "IN",
      language: "en",
    });

    mapsLoaderPromise = loader
      .load()
      .then(() => window.google.maps.importLibrary("places"))
      .catch((err) => {
        mapsLoaderPromise = null;
        throw err;
      });
  }

  return mapsLoaderPromise;
}

function parseAddressComponents(components = []) {
  let street = "";
  let area = "";
  let city = "";
  let state = "";
  let pincode = "";
  let country = "";

  components.forEach((component) => {
    const types = component.types || [];
    const longName = component.longText || component.long_name || "";
    const shortName = component.shortText || component.short_name || "";

    if (types.includes("street_number")) {
      street = `${longName} ${street}`.trim();
    }
    if (types.includes("route")) {
      street = `${street} ${shortName || longName}`.trim();
    }
    if (
      types.includes("sublocality_level_1") ||
      types.includes("sublocality") ||
      types.includes("neighborhood")
    ) {
      if (!area) area = longName;
    }
    if (types.includes("locality")) city = longName;
    if (!city && types.includes("administrative_area_level_2")) city = longName;
    if (types.includes("administrative_area_level_1")) state = longName;
    if (types.includes("postal_code")) pincode = longName;
    if (types.includes("country")) country = longName;
  });

  const line = [street, area].filter(Boolean).join(", ");
  return { line, city, state, pincode, country };
}

/**
 * Street / Landmark field with inline Google Places autocomplete.
 * Selected suggestion fills THIS same input, and autofills city/state/pincode.
 */
export default function AddressAutocomplete({
  value = "",
  onChange,
  setForm,
  label = "Street / Landmark",
  error,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [apiError, setApiError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const placesRef = useRef(null);
  const sessionTokenRef = useRef(null);
  const debounceRef = useRef(null);
  const rootRef = useRef(null);
  const skipFetchRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    loadPlacesLibrary()
      .then((places) => {
        if (cancelled) return;
        placesRef.current = places;
        sessionTokenRef.current = new places.AutocompleteSessionToken();
        setReady(true);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) {
          setApiError(
            "Address search unavailable. Enable Maps JavaScript API + Places API (New).",
          );
        }
      });

    return () => {
      cancelled = true;
      clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const fetchSuggestions = useCallback(async (text) => {
    const places = placesRef.current;
    if (!places?.AutocompleteSuggestion || text.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const { suggestions: results } =
        await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: text,
          includedRegionCodes: ["in"],
          language: "en",
          sessionToken: sessionTokenRef.current,
        });

      const mapped = (results || [])
        .map((item) => {
          const prediction = item.placePrediction;
          if (!prediction) return null;
          return {
            prediction,
            mainText: prediction.mainText?.text || prediction.text?.text || "",
            secondaryText: prediction.secondaryText?.text || "",
          };
        })
        .filter(Boolean);

      setSuggestions(mapped);
      setOpen(mapped.length > 0);
      setActiveIndex(-1);
    } catch (err) {
      console.error("Autocomplete suggestion error:", err);
      setSuggestions([]);
      setOpen(false);
      setApiError("Could not fetch suggestions. Check Places API access.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const next = e.target.value;
    onChange?.(next);
    skipFetchRef.current = false;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!skipFetchRef.current) fetchSuggestions(next);
    }, 280);
  };

  const selectSuggestion = async (item) => {
    if (!item?.prediction) return;

    setLoading(true);
    setOpen(false);
    setSuggestions([]);
    skipFetchRef.current = true;

    try {
      const place = item.prediction.toPlace();
      await place.fetchFields({
        fields: ["formattedAddress", "addressComponents", "displayName"],
      });

      const parsed = parseAddressComponents(place.addressComponents || []);
      const filled =
        place.formattedAddress ||
        [item.mainText, item.secondaryText].filter(Boolean).join(", ") ||
        place.displayName ||
        value;

      // Fill the same Street/Landmark input
      onChange?.(filled);

      // Autofill related fields
      setForm?.((prev) => ({
        ...prev,
        address2: filled,
        city: parsed.city || prev.city,
        state: parsed.state || prev.state,
        pincode: parsed.pincode || prev.pincode,
        country: parsed.country || prev.country || "India",
      }));

      if (placesRef.current?.AutocompleteSessionToken) {
        sessionTokenRef.current =
          new placesRef.current.AutocompleteSessionToken();
      }
    } catch (err) {
      console.error("Place details error:", err);
      setApiError("Could not load the selected address details.");
    } finally {
      setLoading(false);
      setActiveIndex(-1);
    }
  };

  const onKeyDown = (e) => {
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="addr-ac" ref={rootRef}>
      <div className="fi-wrap addr-ac-field">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onKeyDown={onKeyDown}
          disabled={!ready && !apiError}
          placeholder=" "
          className={`addr-ac-input${value ? " fi-has-val" : ""}`}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="addr-ac-list"
        />
        <label>{label}</label>
        {loading && <span className="addr-ac-spinner" aria-hidden />}
      </div>

      {open && suggestions.length > 0 && (
        <ul id="addr-ac-list" className="addr-ac-list" role="listbox">
          {suggestions.map((item, index) => (
            <li
              key={`${item.mainText}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
            >
              <button
                type="button"
                className={`addr-ac-item${index === activeIndex ? " is-active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(item)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="addr-ac-pin" aria-hidden>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="12" cy="10" r="2.2" fill="currentColor" />
                  </svg>
                </span>
                <span className="addr-ac-text">
                  <span className="addr-ac-main">{item.mainText}</span>
                  {item.secondaryText && (
                    <span className="addr-ac-sub">{item.secondaryText}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {(error || apiError) && (
        <p className="fi-error">{error || apiError}</p>
      )}
    </div>
  );
}
