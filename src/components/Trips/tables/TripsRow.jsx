import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import Badge from "../../ui/badge/Badge";

export default function TripsRow({ trip, onEdit, onView }) {

  const badgeColor =
    trip.estado === "Activo"
      ? "success"
      : trip.estado === "Pendiente"
      ? "warning"
      : trip.estado === "Cancelado"
      ? "danger"
      : "gray";

  return (
    <tr className="border border-gray-200 hover:bg-gray-50 transition-colors">

      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-700">
        {trip.id}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {trip.entidad}
      </td>

       <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {trip.tipo}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700 truncate max-w-[200px]">
        {trip.objetivo}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">
        {trip.dias}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {trip.pasajeros}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {trip.fecha_inicial}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {trip.fecha_final}
      </td>

      <td className="border border-gray-200 px-3 py-2">
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {trip.estado}
        </Badge>
      </td>

      <td className="border border-gray-200 px-3 py-2">
        <div className="flex items-center justify-center gap-2">

          <button
            onClick={() => onEdit(trip)}
            title="Editar"
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            <FaEdit size={14} />
          </button>

          <button
            onClick={() => onView(trip)}
            title="Ver detalle"
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <FaEye size={14} />
          </button>

        </div>
      </td>

    </tr>
  );
}