import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaTachometerAlt, FaPrint } from "react-icons/fa";

export default function TripReportRow({
  trip,
  index,
  onUpdateKm,
}) {

  const handlePrint = () => {
    window.print();
  };

  return (
    <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center text-gray-700 dark:text-gray-300">
        {index}
      </TableCell>

      {/* VEHÍCULO */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {trip.vehiculoNombre}
      </TableCell>

      {/* CHOFER */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {trip.choferNombre}
      </TableCell>

      {/* ENCARGADO */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {trip.encargadoNombre}
      </TableCell>

      {/* ENTIDAD */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {trip.entidad}
      </TableCell>

      {/* FECHA */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center text-gray-700 dark:text-gray-300">
        {trip.fechapartida}
      </TableCell>

      {/* KM */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center">

        <button
          onClick={() => onUpdateKm?.(trip)}
          className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition"
          title="Actualizar KM"
        >
          <FaTachometerAlt size={14} />
        </button>

      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center">

        <button
          onClick={handlePrint}
          className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
        >
          <FaPrint size={14} />
        </button>

      </TableCell>

    </TableRow>
  );
}