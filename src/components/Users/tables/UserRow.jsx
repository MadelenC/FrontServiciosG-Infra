import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit } from "react-icons/fa";

export default function UserRow({ user, onEdit }) {
  const badgeColor =
    user.tipo === "Administrador"
      ? "success"
      : user.tipo === "Empleado"
      ? "warning"
      : "info";

  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-300">
        {user.id}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {user.nombres}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {user.apellidos}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {user.cedula}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {user.celular}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {user.tipo}
        </Badge>
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 capitalize text-gray-700 dark:text-gray-300">
        {user.cargo}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
        <button
          className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
          title="Editar usuario"
          onClick={() => onEdit(user)}
        >
          <FaEdit size={14} />
        </button>
      </TableCell>

    </TableRow>
  );
}


