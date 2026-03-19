import React, { useState } from "react";
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

export default function TripsRow({ trip, onOpenModal }) {
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
    <tr className="border border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Datos */}
      <td className="border px-3 py-2">{trip.id}</td>
      <td className="border px-3 py-2">{trip.entidad}</td>
      <td className="border px-3 py-2">{trip.tipo}</td>
      <td className="border px-3 py-2 truncate max-w-[200px]">
        {trip.objetivo}
      </td>
      <td className="border px-3 py-2 text-center">{trip.dias}</td>
      <td className="border px-3 py-2">{trip.pasajeros}</td>
      <td className="border px-3 py-2">{trip.fecha_inicial}</td>
      <td className="border px-3 py-2">{trip.fecha_final}</td>

      {/* Estado */}
      <td className="border px-3 py-2">
        <Badge size="sm" color={badgeColor}>
          {trip.estado}
        </Badge>
      </td>

      {/* OPERACIONES */}
      <td className="border px-3 py-2 relative">
        <div className="flex flex-col gap-1">

          {/* PRESUPUESTO */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("presupuesto")}
              className="w-full text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center gap-1"
            >
              <FaMoneyBill size={10} />
              Presupuesto
            </button>

            {openMenu === "presupuesto" && (
              <div className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-md z-10 text-xs">

                {/* CHEQUE */}
                <button
                  onClick={() => {
                    onOpenModal("cheque", trip);
                    setOpenMenu(null);
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  <FaFileInvoice size={10} />
                  Cheque
                </button>

                {/* CAJA */}
                <button
                  onClick={() => {
                    onOpenModal("caja", trip);
                    setOpenMenu(null);
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100"
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
              className="w-full text-xs px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 flex items-center gap-1"
            >
              <FaCogs size={10} />
              Realizar
            </button>

            {openMenu === "realizar" && (
              <div className="absolute right-0 mt-1 w-36 bg-white border rounded shadow-md z-10 text-xs">
                <button className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100">
                  <FaEye size={10} />
                  Ver
                </button>
                <button className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100">
                  <FaPrint size={10} />
                  Imprimir
                </button>
                <button className="flex items-center gap-1 w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100">
                  <FaTrash size={10} />
                  Eliminar
                </button>
              </div>
            )}
          </div>

          {/* CANCELAR */}
          <button className="w-full text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 flex items-center gap-1">
            <FaTimes size={10} />
            Cancelar
          </button>
        </div>
      </td>
    </tr>
  );
}