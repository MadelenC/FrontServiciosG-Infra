import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function MapsRow({ item, index, openModal }) {
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">
      <TableCell className="border border-gray-200 px-3 py-2 text-center font-medium text-gray-700">
        {index + 1}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {item.destino}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {item.titulo}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-center text-gray-700">
        {item.lat}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-center text-gray-700">
        {item.lng}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-center">
        <button
          onClick={() => openModal(item)} // dispara el modal en el padre
          title="Ver mapa"
          className="w-8 h-8 flex items-center justify-center mx-auto
                     rounded-full bg-green-50 text-green-600
                     hover:bg-green-100 transition"
        >
          <FaMapMarkedAlt size={14} />
        </button>
      </TableCell>
    </TableRow>
  );
}

