import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit } from "react-icons/fa";

export default function CheckBudgetRow({ budget, index, onEdit }) {

  const badgeColor =
    budget.entidad === "Interno"
      ? "success"
      : budget.entidad === "Externo"
      ? "warning"
      : "info";

  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700">
        {index}
      </TableCell>

      {/* Num-Pre */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {budget.numPre}
      </TableCell>

      {/* Chofer */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {budget.chofer}
      </TableCell>

      {/* Vehiculo */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {budget.vehiculo}
      </TableCell>

      {/* Entidad */}
      <TableCell className="border border-gray-200 px-3 py-2">
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {budget.entidad}
        </Badge>
      </TableCell>

      {/* Operaciones */}
      <TableCell className="border border-gray-200 px-3 py-2">
        <button
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
          title="Editar presupuesto"
          onClick={() => onEdit(budget)}
        >
          <FaEdit size={14} />
        </button>
      </TableCell>

    </TableRow>
  );
}