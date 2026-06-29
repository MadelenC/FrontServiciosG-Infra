import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit } from "react-icons/fa";
import ProtectedView from "../../Protected/ProtectedView";

export default function UserRow({ user, onEdit,onToggleActive, }) {
  const badgeColor =
    user.tipo_serv === "Administrador"
      ? "success"
      : user.tipo_serv === "Empleado"
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

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 dark:text-gray-300">
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {user.tipo_serv}
        </Badge>
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 capitalize text-gray-700 dark:text-gray-300">
        {user.cargo}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">

        <span
          onClick={() => onToggleActive(user)}
          className={`
            inline-flex items-center justify-center
            min-w-[95px]
            px-4 py-1.5
            rounded-full
            text-xs font-semibold
            cursor-pointer
            transition-all duration-200
            hover:scale-105
            active:scale-95
            hover:shadow-md
            ${
              user.userInstitutions?.some((ui) => ui.active)
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                : "bg-rose-100 text-rose-700 hover:bg-rose-200"
            }
          `}
        >
          {user.userInstitutions?.some((ui) => ui.active)
            ? "Activo"
            : "Inactivo"}
        </span>
      </TableCell>

      <ProtectedView
            rolesAllowed={["administradorserv"]}
          >

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
        
        <button
          className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
          title="Editar usuario"
          onClick={() => onEdit(user)}
        >
          <FaEdit size={14} />
        </button>
      </TableCell>
      </ProtectedView>

    </TableRow>
  );
}


