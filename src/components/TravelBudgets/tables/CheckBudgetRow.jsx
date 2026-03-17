import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit, FaPrint } from "react-icons/fa";

export default function CheckBudgetRow({ budget, index, onEdit }) {

  const badgeColor =
    budget.entidad === "Interno"
      ? "success"
      : budget.entidad === "Externo"
      ? "warning"
      : "info";

  const handlePrint = () => {
    console.log("Imprimiendo:", budget);
    window.print();
  };

  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700"> {index}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">{budget.numPre} </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700"> {budget.chofer}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">{budget.vehiculo}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2"><Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">{budget.entidad}</Badge></TableCell>
      <TableCell className="border border-gray-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
            title="Editar presupuesto"
            onClick={() => onEdit(budget)}
          >
            <FaEdit size={14} />
          </button>
          <button
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
            title="Imprimir presupuesto"
            onClick={handlePrint}
          >
            <FaPrint size={14} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}