import React from "react";
import { TableRow, TableCell } from "../../../ui/table";

export default function RechaRow({ item, index, onAction }) {
  return (
    <TableRow className="border hover:bg-gray-50 dark:text-gray-400">


      <TableCell className="border px-3 py-2">
        {index}
      </TableCell>

  
      <TableCell className="border px-3 py-2">
        {item.id_nro || "-"}
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
        <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
          {item.aprobacion || "-"}
        </span>
      </TableCell>


      <TableCell className="border px-3 py-2">
        {item.informe || "-"}
      </TableCell>


      <TableCell className="border px-3 py-2 text-center">

          <button
          onClick={() => onAction?.("accept", item)}
          className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-semibold transition"
        >
          Informe
        </button>

        <button
          onClick={() => onAction?.("reject", item)}
          className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 text-xs font-semibold transition"
        >
          Aceptado
        </button>

      </TableCell>

    </TableRow>
  );
}