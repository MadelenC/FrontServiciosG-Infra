import React, { useState } from "react";
import { TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import {
  FaMoneyBill,
  FaFileInvoice,
  FaCashRegister,
  FaCogs,
  FaEye,
  FaPrint,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

export default function TripsRow({ trip, onOpenModal, onCancelTrip }) {
  const [openMenu, setOpenMenu] = useState(null);

  const badgeColor =
    trip.estado === "Activo"
      ? "success"
      : trip.estado === "Pendiente"
      ? "warning"
      : trip.estado === "Cancelado"
      ? "danger"
      : "gray";

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <tr
      className="
        border border-gray-200
        dark:border-gray-700
        hover:bg-gray-50 dark:hover:bg-gray-800
        transition-colors
      "
    >
      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.id}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.entidad}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.tipo}
      </TableCell>

      <TableCell className="border px-3 py-2 truncate max-w-[200px] dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.objetivo}
      </TableCell>

      <TableCell className="border px-3 py-2 text-center dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.dias}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.pasajeros}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.fecha_inicial}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.fecha_final}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700">
        <Badge size="sm" color={badgeColor}>
          {trip.estado}
        </Badge>
      </TableCell>

      {/* OPERACIONES */}
      <TableCell className="border px-3 py-2 relative dark:border-gray-700">
        <div className="flex flex-col gap-1">

          {/* PRESUPUESTO */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("presupuesto")}
              className="w-full text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200
                         dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800
                         flex items-center gap-1"
            >
              <FaMoneyBill size={10} />
              Presupuesto
            </button>

            {openMenu === "presupuesto" && (
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-900
                              border dark:border-gray-700 rounded shadow-md z-10 text-xs">

                <button
                  onClick={() => {
                    onOpenModal("cheque", trip);
                    setOpenMenu(null);
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100
                             dark:hover:bg-gray-800"
                >
                  <FaFileInvoice size={10} />
                  Cheque
                </button>

                <button
                  onClick={() => {
                    onOpenModal("caja", trip);
                    setOpenMenu(null);
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100
                             dark:hover:bg-gray-800"
                >
                  <FaCashRegister size={10} />
                  Caja
                </button>

              </div>
            )}
          </div>

          {/* REALIZAR */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("realizar")}
              className="w-full text-xs px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200
                         dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800
                         flex items-center gap-1"
            >
              <FaCogs size={10} />
              Realizar
            </button>

            {openMenu === "realizar" && (
              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-900
                              border dark:border-gray-700 rounded shadow-md z-10 text-xs">

                <button className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100
                                   dark:hover:bg-gray-800">
                  <FaEye size={10} />
                  Ver
                </button>

                <button className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100
                                   dark:hover:bg-gray-800">
                  <FaPrint size={10} />
                  Imprimir
                </button>

                <button className="flex items-center gap-1 w-full text-left px-2 py-1 text-red-600
                                   hover:bg-gray-100 dark:hover:bg-gray-800">
                  <FaTrash size={10} />
                  Eliminar
                </button>

              </div>
            )}
          </div>

          {/* CANCELAR */}
          <button
            onClick={() => {
              if (!confirm("¿Seguro que deseas cancelar este viaje?")) return;
              onCancelTrip(trip.id);
            }}
            className="w-full text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200
                       dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800
                       flex items-center gap-1"
          >
            <FaTimes size={10} />
            Cancelar
          </button>

        </div>
      </TableCell>
    </tr>
  );
}