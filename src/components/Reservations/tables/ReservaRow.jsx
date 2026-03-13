import React, { useState, useEffect } from "react";
import ReservaModal from "../form/ReservaModal";
import { useReservaStore } from "../../../zustand/useReservationsStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore"; 
import { useDestinoStore } from "../../../zustand/useDestinationsStore";
import { createPortal } from "react-dom";

const formatDate = (isoDate) => {
  if (!isoDate) return "-";
  return isoDate.split("T")[0];
};

export default function ReservaRow({ reserva }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { editReserva } = useReservaStore();

  // Usuarios
  const { users, fetchUsers } = useUserStore(); 
  useEffect(() => { fetchUsers(); }, []);
  const choferes = users?.filter(u => u.tipo === "chofer") || [];
  const encargados = users?.filter(u => u.tipo === "encargado") || [];

  // Vehículos
  const { vehicles, fetchVehicles } = useVehicleStore();
  useEffect(() => { fetchVehicles(); }, []);

  // Destinos
  const { destinos, fetchDestinos } = useDestinoStore();
  useEffect(() => { fetchDestinos(); }, []);

  const handleConcretarClick = () => setIsModalOpen(true);

  const handleSave = async (updatedData) => {
    await editReserva(reserva.id, updatedData);
    setIsModalOpen(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">{reserva.id}</td>
        <td className="border border-gray-200 px-3 py-2 text-gray-700">{reserva.entidad}</td>
        <td className="border border-gray-200 px-3 py-2 text-gray-700">
          {reserva.user ? `${reserva.user.nombres} ${reserva.user.apellidos}` : "Sin encargado"}
        </td>
        <td className="border border-gray-200 px-3 py-2 text-gray-700">{reserva.objetivo}</td>
        <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">{reserva.pasajeros}</td>
        <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">{formatDate(reserva.fecha_inicial)}</td>
        <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">{formatDate(reserva.fecha_final)}</td>
        <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">{reserva.dias}</td>
        <td className="border border-gray-200 px-3 py-2 text-center space-y-1">
          <div className="text-blue-600 cursor-pointer hover:underline">Ninguna</div>
          <button
            className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700"
            onClick={handleConcretarClick}
          >
            Concretar
          </button>
        </td>
      </tr>

      {isModalOpen && createPortal(
        <ReservaModal
          isOpen={true}
          initialData={reserva}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehicles}
          destinos={destinos}
        />,
        document.body
      )}
    </>
  );
}