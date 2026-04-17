import React from "react";
import { TableRow, TableCell } from "../../ui/table";

export default function FuelRow({ item, index }) {
  return (
    <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-gray-700 dark:text-gray-300 text-center">
        {index}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-gray-700 dark:text-gray-300">
        {item.solicitud}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-gray-700 dark:text-gray-300">
        {item.pedido}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-gray-700 dark:text-gray-300">
        {item.fecha}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-gray-700 dark:text-gray-300">
        {item.factura}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-gray-700 dark:text-gray-300">
        {item.vehiculo}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-center text-gray-700 dark:text-gray-300">
        {item.gasolina}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-center text-gray-700 dark:text-gray-300">
        {item.diesel}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 text-center text-gray-700 dark:text-gray-300">
        {item.gnv}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-6 py-2 font-medium text-gray-900 dark:text-gray-100">
        {item.total}
      </TableCell>

    </TableRow>
  );
}
