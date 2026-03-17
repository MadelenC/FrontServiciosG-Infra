import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit } from "react-icons/fa";

export default function CashBudgetRow({ budget, index, onEdit }) {

  const badgeColor =
    budget.entidad === "Interno"
      ? "success"
      : budget.entidad === "Externo"
      ? "warning"
      : "info";

  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">

      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700">
        {index}
      </TableCell>

      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {budget.numPre}
      </TableCell>

      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {budget.chofer}
      </TableCell>

      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {budget.vehiculo}
      </TableCell>

      <TableCell className="border border-gray-200 px-3 py-2">
        <Badge size="sm" color={badgeColor}>
          {budget.entidad}
        </Badge>
      </TableCell>

      <TableCell className="border border-gray-200 px-3 py-2">
        <button
          onClick={() => onEdit(budget)}
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
        >
          <FaEdit size={14} />
        </button>
      </TableCell>

    </TableRow>
  );
}