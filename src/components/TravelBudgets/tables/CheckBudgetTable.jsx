import React, { useState } from "react";
import CheckBudgetRow from "./CheckBudgetRow";


export default function CheckBudgetTable({ budgets }) {
  const [selectedBudget, setSelectedBudget] = useState(null);

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-sm bg-white">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {[
                "#",
                "Num-Pre",
                "Chofer",
                "Vehiculo",
                "Entidad",
                "Operaciones",
              ].map((head) => (
                <th
                  key={head}
                  className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {budgets.length > 0 ? (
              budgets.map((budget, index) => (
                <CheckBudgetRow
                  key={budget.id}
                  index={index + 1}
                  budget={budget}
                  onEdit={(b) => setSelectedBudget(b)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No se encontraron presupuestos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}