import React from "react";

export default function TableBase({ headers = [], children }) {
  return (
    <div className="overflow-x-auto rounded-xl border shadow-sm">

      <table className="w-full text-sm">

        {/* HEADER UNIFICADO */}
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border px-3 py-2 text-left font-semibold text-gray-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* CUERPO */}
        <tbody>
          {children}
        </tbody>

      </table>

    </div>
  );
}