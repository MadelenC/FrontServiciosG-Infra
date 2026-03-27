import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaCheck, FaBox } from "react-icons/fa";

export default function ApplicationRow({
  application,
  index,
  onConcretar,
  onPedido,
}) {
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700">
        {index}
      </TableCell>

      {/* CHOFER */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {application.chofer || ""}
      </TableCell>

      {/* VEHÍCULO */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {application.vehiculo
          ? [application.vehiculo.tipog, application.vehiculo.placa].filter(Boolean).join(" - ")
          : "-"}
      </TableCell>

      {/* ACCESORIOS */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {application.accesorios?.length
          ? application.accesorios.map(a => a.solicitud).join(", ")
          : "-"}
      </TableCell>

      {/* DESCRIPCIÓN */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {application.descripcion}
      </TableCell>

      {/* FECHA */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {application.fecha}
      </TableCell>
        {/* OPERACIONES */}
      <TableCell className="border border-gray-200 px-3 py-2">
        <div className="flex flex-col gap-2">

          {/* CONCRETAR */}
          <button
            onClick={() => onConcretar(application)}
            className="w-full text-xs px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 flex items-center gap-1"
          >
            <FaCheck size={12} />
            Concretar
          </button>

          {/* PEDIDO.M */}
          <button
            onClick={() => onPedido(application)}
            className="w-full text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center gap-1"
          >
            <FaBox size={12} />
            Pedido.M
          </button>

        </div>
      </TableCell>
      {/* TRABAJOS */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {application.trabajos || "-"}
      </TableCell>

     
    </TableRow>
  );
}