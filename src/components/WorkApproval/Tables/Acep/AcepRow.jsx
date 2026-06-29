import React from "react";
import { TableRow, TableCell } from "../../../ui/table";
import ProtectedView from "../../../Protected/ProtectedView";

export default function AcepRow({ item, index, onAction }) {
  return (
    <TableRow className="border hover:bg-gray-50 dark:text-gray-400">

      
      <TableCell className="border px-3 py-2">
        {index}
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.id || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.institucion?.nombre || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.descripcion || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.taller || "-"}
      </TableCell>


      <TableCell className="border px-3 py-2">
        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-10 text-green-700">
          {item.aprobacion || "-"}
        </span>
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.informe || "-"}
      </TableCell>

      <ProtectedView  rolesAllowed={["administradorserv"]}>
      <TableCell className="flex items-center justify-center gap-2">

       <button
          onClick={() => onAction?.("informe", item)}
          className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-semibold transition"
        >
          Informe
        </button>

        <button
          onClick={() => onAction?.("reject", item)}
          className="px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold transition"
        >
          Rechazado
        </button>

      </TableCell>
      </ProtectedView>

    </TableRow>
  );
}
