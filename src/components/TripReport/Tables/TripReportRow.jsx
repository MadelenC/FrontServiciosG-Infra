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
    <TableRow className="hover:bg-gray-50">

      <TableCell className="border px-3 py-2 text-center">
        {index}
      </TableCell>

      {/* VEHÍCULO */}
      <TableCell className="border px-3 py-2">
        {trip.vehiculoNombre}
      </TableCell>

      {/* CHOFER */}
      <TableCell className="border px-3 py-2">
        {trip.choferNombre}
      </TableCell>

      {/* ENCARGADO */}
      <TableCell className="border px-3 py-2">
        {trip.encargadoNombre}
      </TableCell>

      {/* ENTIDAD */}
      <TableCell className="border px-3 py-2">
        {trip.entidad}
      </TableCell>

      {/* FECHA */}
      <TableCell className="border px-3 py-2 text-center">
        {trip.fechapartida}
      </TableCell>

      {/* KM */}
      <TableCell className="border px-3 py-2 text-center">
        <button
          onClick={() => onUpdateKm?.(trip)}
          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
          title="Actualizar KM"
        >
          <FaTachometerAlt size={14} />
        </button>
      </TableCell>

      {/* OPERACIÓN */}
      <TableCell className="border px-3 py-2 text-center">

        <button
          onClick={handlePrint}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
        >
          <FaPrint size={14} />
        </button>

      </TableCell>

    </TableRow>
  );
}