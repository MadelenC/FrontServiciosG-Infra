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

import CheckBudgetForm from "../form/TripsCheckForm";
import TripsCajaForm from "../form/TripsCajaForm";

export default function TripsRow({ trip, choferes, encargados, vehiculos }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openCheckForm, setOpenCheckForm] = useState(false);
  const [openCajaForm, setOpenCajaForm] = useState(false);

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
    <>
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

        {/* OPERACIONES */}
        <td className="border border-gray-200 px-3 py-2 relative">
          <div className="flex flex-col items-center gap-1">

            {/* PRESUPUESTO */}
            <div className="relative w-full">
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
                      setOpenCheckForm(true);
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
                      setOpenCajaForm(true);
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
            <div className="relative w-full">
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

      {/* MODALES */}
      {openCheckForm && (
        <CheckBudgetForm
          data={trip}
          onClose={() => setOpenCheckForm(false)}
        />
      )}

      {openCajaForm && (
        <TripsCajaForm
          viajeData={trip}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehiculos}
          onClose={() => setOpenCajaForm(false)}
          onSubmit={(data) => {
            console.log("Datos guardados en Caja:", data);
            setOpenCajaForm(false);
          }}
        />
      )}
    </>
  );
}