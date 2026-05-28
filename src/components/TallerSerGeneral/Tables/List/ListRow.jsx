import React from "react";
import { TableRow, TableCell } from "../../../ui/table";
import { FaClipboardList, FaTools, FaCheck, FaTimes } from "react-icons/fa";

export default function ListElecRow({ item, index, onAction }) {
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition dark:text-gray-400">

      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {index}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.id || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.institucion?.nombre || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.descripcion || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.taller || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-500">
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            item.aprobacion === "pendiente"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.aprobacion || "Pendiente"}
        </span>
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.fecha
          ? new Date(item.fecha).toLocaleDateString()
          : "-"}
      </TableCell>

   
     <TableCell className="border px-3 py-2">
  <div className="grid grid-cols-2 gap-2 place-items-center">

    <button
      onClick={() => onAction?.("pedido", item)}
      className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
      title="Pedidos"
    >
      <FaClipboardList size={14} />
    </button>


    <button
      onClick={() => onAction?.("trabajo", item)}
      className="p-2 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
      title="Trabajo"
    >
      <FaTools size={14} />
    </button>

  
    <button
      onClick={() => onAction?.("accept", item)}
      className="p-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition"
      title="Aceptar"
    >
      <FaCheck size={14} />
    </button>

  
    <button
      onClick={() => onAction?.("reject", item)}
      className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
      title="Rechazar"
    >
      <FaTimes size={14} />
    </button>

  </div>
</TableCell>
    </TableRow>
  );
}