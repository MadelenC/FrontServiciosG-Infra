import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function MapsRow({ item, index, openModal }) {
  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
        {index + 1}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {item.destino}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {item.titulo}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center text-gray-700 dark:text-gray-300">
        {item.lat}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center text-gray-700 dark:text-gray-300">
        {item.lng}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center">

        <button
          onClick={() => openModal(item)}
          title="Ver mapa"
          className="w-8 h-8 flex items-center justify-center mx-auto
                     rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400
                     hover:bg-green-100 dark:hover:bg-green-800 transition"
        >
          <FaMapMarkedAlt size={14} />
        </button>

      </TableCell>

    </TableRow>
  );
}

