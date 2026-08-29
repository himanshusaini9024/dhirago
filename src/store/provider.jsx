"use client";

import { Provider } from "react-redux";
import { store } from "./index";

/** Keep Redux persistence from replacing the server-rendered page tree. */
export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
