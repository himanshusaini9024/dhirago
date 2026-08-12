"use client";

import { useMemo, useState } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

const SIZE_ORDER = ["S", "M", "L", "XL"];

function normalizeSizeGuide(raw) {
  if (!raw) return null;

  let data = raw;
  if (typeof raw === "string") {
    try {
      data = JSON.parse(raw);
    } catch {
      return null;
    }
  }

  if (!data || typeof data !== "object") return null;

  if (data.type === "size_guide" && Array.isArray(data.dimensions)) {
    const dimensions = data.dimensions.filter(
      (d) => d && (d.name || "").trim() !== "",
    );
    return dimensions.length ? { type: "size_guide", dimensions } : null;
  }

  if (Array.isArray(data.dimensions)) {
    const dimensions = data.dimensions.filter(
      (d) => d && (d.name || "").trim() !== "",
    );
    return dimensions.length ? { type: "size_guide", dimensions } : null;
  }

  return null;
}

function collectSizeLabels(dimensions = [], productSizes = "") {
  const found = new Set();
  dimensions.forEach((dim) => {
    Object.keys(dim.sizes || {}).forEach((sz) => found.add(String(sz).toUpperCase()));
  });
  if (typeof productSizes === "string" && productSizes.trim()) {
    productSizes
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean)
      .forEach((sz) => found.add(sz));
  }

  const ordered = SIZE_ORDER.filter((sz) => found.has(sz));
  const extras = [...found]
    .filter((sz) => !SIZE_ORDER.includes(sz))
    .sort();
  return [...ordered, ...extras];
}

function cellValue(dim, sizeLabel, unit) {
  const sizes = dim.sizes || {};
  const key =
    Object.keys(sizes).find((k) => k.toUpperCase() === sizeLabel) || sizeLabel;
  const cell = sizes[key];
  if (!cell || typeof cell !== "object") {
    return cell != null && cell !== "" ? String(cell) : "—";
  }

  const inchRaw = cell.inch ?? cell.in ?? cell.IN ?? cell.INCH;
  const cmRaw = cell.cm ?? cell.CM;

  const inchNum = Number(inchRaw);
  const cmNum = Number(cmRaw);
  const hasInchNum = Number.isFinite(inchNum);
  const hasCmNum = Number.isFinite(cmNum);

  // Prefer authored value, otherwise derive the other unit.
  let val;
  if (unit === "cm") {
    if (cmRaw !== undefined && cmRaw !== null && cmRaw !== "") {
      val = cmRaw;
    } else if (hasInchNum) {
      val = (inchNum * 2.54).toFixed(1);
    }
  } else {
    if (inchRaw !== undefined && inchRaw !== null && inchRaw !== "") {
      val = inchRaw;
    } else if (hasCmNum) {
      val = (cmNum / 2.54).toFixed(1);
    }
  }

  if (val === null || val === undefined || val === "") return "—";
  return String(val);
}

export default function MensSizeChart({ sizeGuide, productName, productSizes }) {
  const [unit, setUnit] = useState("in");

  const guide = useMemo(() => normalizeSizeGuide(sizeGuide), [sizeGuide]);
  const dimensions = guide?.dimensions || [];
  const sizeLabels = useMemo(
    () => collectSizeLabels(dimensions, productSizes),
    [dimensions, productSizes],
  );

  if (!dimensions.length) {
    return (
      <div className="bg-white">
        <h3 className="text-[14px] md:text-[0.85rem] py-3 px-4 font-medium font-futura bg-gray-100">
          Size Guide
        </h3>
        <p
          className={`p-6 text-sm text-gray-500 ${josefin.className}`}
        >
          Size guide is not available for this product yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <h3 className="text-[14px] md:text-[0.85rem] py-3 px-4 font-medium font-futura bg-gray-100 pr-12">
        Size Guide
        {productName ? (
          <span className="block mt-1 text-[11px] font-normal text-gray-500 tracking-normal normal-case">
            {productName}
          </span>
        ) : null}
      </h3>

      <div className="flex bg-gray-100 border-t-2 border-b border-solid border-[#e3e3e3]">
        <button
          type="button"
          onClick={() => setUnit("in")}
          className={`relative px-5 py-3 text-sm transition-colors ${
            unit === "in"
              ? "text-black font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Inches
          <span
            className={`absolute left-0 right-0 bottom-0 h-[2px] bg-black transition-opacity ${
              unit === "in" ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
        <button
          type="button"
          onClick={() => setUnit("cm")}
          className={`relative px-5 py-3 text-sm transition-colors ${
            unit === "cm"
              ? "text-black font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Cm
          <span
            className={`absolute left-0 right-0 bottom-0 h-[2px] bg-black transition-opacity ${
              unit === "cm" ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
      </div>

      <div className="overflow-x-auto mt-4 px-3 md:px-4">
        <div className="min-w-[520px]">
          <table className="w-full border border-solid border-gray-300 text-[11px] md:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 md:px-4 py-2 md:py-3 text-left min-w-[120px] md:min-w-[160px]" />
                {sizeLabels.map((sz) => (
                  <th key={sz} className="border px-3 md:px-4 py-2 md:py-3">
                    {sz}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensions.map((row) => (
                <tr className={josefin.className} key={row.name}>
                  <td
                    className={`border border-solid border-gray-300 px-2 md:px-4 py-2 md:py-3 font-medium text-gray-700 text-[10px] md:text-sm whitespace-nowrap ${josefin.className}`}
                  >
                    {row.name}
                  </td>
                  {sizeLabels.map((sz) => (
                    <td
                      key={`${row.name}-${sz}`}
                      className="border border-solid border-gray-300 px-2 md:px-4 py-2 md:py-3 text-[10px] md:text-sm whitespace-nowrap text-center"
                    >
                      {cellValue(row, sz, unit)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`mt-4 mx-3 md:mx-4 mb-4 border rounded bg-gray-100 p-3 md:p-4 text-[11px] md:text-sm text-gray-600 ${josefin.className}`}
      >
        <p>
          <strong>Note:</strong> If you prefer a neater look → size down.
        </p>
        <p className="mt-2 ml-0 md:ml-10">
          If you prefer the intended volume → take your regular size.
        </p>
      </div>
    </div>
  );
}
