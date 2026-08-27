"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./index";

/**
 * PersistGate with loading={null} blocked SSR of the whole app (empty <body>),
 * so Screaming Frog / bots saw no H1, H2, or internal links.
 *
 * SSR + first client paint render children immediately; PersistGate only
 * mounts after hydration so cart/auth can rehydrate without hiding HTML.
 */
export default function ReduxProvider({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}
