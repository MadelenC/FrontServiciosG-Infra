import React from "react";
import { FaEdit, FaTachometerAlt, FaEye } from "react-icons/fa";
import Badge from "../../ui/badge/Badge";

export default function VehicleRow({ vehicle, onEdit, onUpdateKm, onView }) {
  const badgeColor =
    vehicle.estado === "Óptimo"
      ? "success"
      : vehicle.estado === "Mantenimiento"
      ? "warning"
      : vehicle.estado === "Desuso"
      ? "gray"
      : "danger";

  const cellClass =
    "border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300";

  return (
    <tr className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <td className={cellClass}>{vehicle.id}</td>

      <td className={`${cellClass} truncate`}>
        {vehicle.asignacion}
      </td>

      <td className={`${cellClass} truncate`}>
        {vehicle.placa}
      </td>

      <td className={`${cellClass} text-center`}>
        {vehicle.asientos}
      </td>

      <td className={`${cellClass} truncate`}>
        {vehicle.tipog}
      </td>

      <td className={cellClass}>
        {vehicle.kilometraje}
      </td>

      <td className={cellClass}>
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {vehicle.estado}
        </Badge>
      </td>

      <td className={cellClass}>
        <div className="flex items-center justify-center gap-2">

          <button
            onClick={onEdit}
            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
          >
            <FaEdit size={14} />
          </button>

          <button
            onClick={onUpdateKm}
            className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition"
          >
            <FaTachometerAlt size={14} />
          </button>

          <button
            onClick={onView}
            className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition"
          >
            <FaEye size={14} />
          </button>

        </div>
      </td>

    </tr>
  );
}

