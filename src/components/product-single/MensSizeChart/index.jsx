"use client";

import { useState } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});
export default function MensSizeChart() {
  const [unit, setUnit] = useState("in");

  const sizes = [
    {
      label: "FITS BODY CHEST",
      XS: { in: "36", cm: "91" },
      S: { in: "38", cm: "97" },
      M: { in: "40", cm: "102" },
      L: { in: "42", cm: "107" },
      XL: { in: "44", cm: "112" },
    },
    {
      label: "GARMENT CHEST",
      XS: { in: "48.5", cm: "123" },
      S: { in: "50.5", cm: "128" },
      M: { in: "52.5", cm: "133" },
      L: { in: "54.5", cm: "138" },
      XL: { in: "56.5", cm: "143" },
    },
    {
      label: "SHOULDER",
      XS: { in: "17.75", cm: "45" },
      S: { in: "18.25", cm: "46" },
      M: { in: "18.75", cm: "48" },
      L: { in: "19.25", cm: "49" },
      XL: { in: "19.75", cm: "50" },
    },
    {
      label: "LENGTH",
      XS: { in: "27.75", cm: "70" },
      S: { in: "28.25", cm: "72" },
      M: { in: "28.75", cm: "73" },
      L: { in: "29.25", cm: "74" },
      XL: { in: "29.75", cm: "76" },
    },
    {
      label: "SLEEVE LENGTH",
      XS: { in: "24.25", cm: "62" },
      S: { in: "24.75", cm: "63" },
      M: { in: "25.25", cm: "64" },
      L: { in: "25.75", cm: "65" },
      XL: { in: "26.25", cm: "67" },
    },
    {
      label: "FIT INTENT",
      XS: { in: "Oversized", cm: "Oversized" },
      S: { in: "Oversized", cm: "Oversized" },
      M: { in: "Oversized", cm: "Oversized" },
      L: { in: "Oversized", cm: "Oversized" },
      XL: { in: "Oversized", cm: "Oversized" },
    },
  ];

  return (
    <div className="bg-white">
      <h3 className="text-[14px] md:text-[0.85rem] py-3 px-4 font-medium font-futura bg-gray-100">
        Size Guide
      </h3>

      {/* Tabs */}
      <div className="border-b flex bg-gray-100 border-t-2 border-solid border-[#e3e3e3] ">
        <button
          onClick={() => setUnit("in")}
          className={`px-5 py-3 text-sm ${
            unit === "in"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          Inches
        </button>

        <button
          onClick={() => setUnit("cm")}
          className={`px-5 py-3 text-sm ${
            unit === "cm"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          Cm
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <div className="min-w-[600px]">
          <table className="w-full border border-solid border-gray-300 text-[11px] md:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 md:px-4 py-2 md:py-3 text-left min-w-[120px] md:min-w-[180px]"></th>
                <th className="border px-4 py-3">XS</th>
                <th className="border px-4 py-3">S</th>
                <th className="border px-4 py-3">M</th>
                <th className="border px-4 py-3">L</th>
                <th className="border px-4 py-3">XL</th>
              </tr>
            </thead>

            <tbody>
              {sizes.map((row) => (
                <tr className={`${josefin.className} `} key={row.label}>
                  <td
                    className={`  border border-solid border-gray-300
            px-2 md:px-4
            py-2 md:py-3
            font-medium
            text-gray-700
            text-[10px]
            md:text-sm
            whitespace-nowra ${josefin.className} `}
                  >
                    {row.label}
                  </td>

                  <td
                    className="border border-solid border-gray-300 px-2 md:px-4
        py-2 md:py-3
        text-[10px]
        md:text-sm
        whitespace-nowrap"
                  >
                    {row.XS[unit]}
                  </td>
                  <td
                    className="border border-solid border-gray-300 px-2 md:px-4
          py-2 md:py-3
          text-[10px]
          md:text-sm
          whitespace-nowrap"
                  >
                    {row.S[unit]}
                  </td>
                  <td
                    className="border border-solid border-gray-300 px-2 md:px-4
          py-2 md:py-3
          text-[10px]
          md:text-sm
          whitespace-nowrap"
                  >
                    {row.M[unit]}
                  </td>
                  <td
                    className="border border-solid border-gray-300 px-2 md:px-4
          py-2 md:py-3
          text-[10px]
          md:text-sm
          whitespace-nowrap"
                  >
                    {row.L[unit]}
                  </td>
                  <td
                    className="border border-solid border-gray-300 px-2 md:px-4
          py-2 md:py-3
          text-[10px]
          md:text-sm
          whitespace-nowrap"
                  >
                    {row.XL[unit]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note */}
      <div
        className={`mt-4 border rounded bg-gray-100 p-3 md:p-4 text-[11px] md:text-sm text-gray-600 ${josefin.className}`}
      >
        <p>
          <strong>Note:</strong> If you prefer a neater look → size down.
        </p>
        <p className="mt-2 ml-10">
          If you prefer the intended volume → take your regular size.
        </p>
      </div>
    </div>
  );
}
