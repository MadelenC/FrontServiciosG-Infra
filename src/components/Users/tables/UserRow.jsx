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
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">
      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700">{user.id}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">{user.nombres}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">{user.apellidos}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">{user.cedula}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">{user.celular}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2">
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {user.tipo}
        </Badge>
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 capitalize text-gray-700">{user.cargo}</TableCell>
      <TableCell className="border border-gray-200 px-3 py-2">
        <button
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
          title="Editar usuario"
          onClick={() => onEdit(user)}
        >
          <FaEdit size={14} />
        </button>
      </TableCell>
    </TableRow>
  );
}



