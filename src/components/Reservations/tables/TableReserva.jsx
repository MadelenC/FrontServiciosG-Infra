import { useState, useEffect } from "react";
import SearchBar from "../search/SearchBar";
import ReservaTable from "./ReservaTable";
import Pagination from "./Paginations";
import AddReservaModal from "./../form/AddRerservaForm";
import { useReservaStore } from "../../../zustand/useReservationsStore";
import { useUserStore } from "../../../zustand/userStore"; // Para obtener los usuarios

export default function TableReserva() {
  const { reservas, fetchReservas, loading, error, addReserva } = useReservaStore();

  // Usuarios
  const { users, fetchUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const limit = 8
  // Traer reservas
  useEffect(() => {
    fetchReservas();
  }, []);

  // Traer usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  // Reiniciar página cuando cambia la búsqueda
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Filtrado de reservas según búsqueda
  const filtered = reservas.filter((r) =>
    r.entidad?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  // Filtrar solo los encargados
  const encargados = users?.filter(u => u.tipo === "encargado") || [];

  // Guardar reserva en backend
  const handleSaveReserva = async (data) => {
    setSaving(true);
    const response = await addReserva(data);
    setSaving(false);

    if (response.ok) {
      setIsModalOpen(false);
    } else {
      alert("Error al guardar: " + response.error);
    }
  };

  if (loading)
    return <div className="p-4 text-center">Cargando reservas...</div>;

  if (error)
    return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-center mb-4 gap-4">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Imprimir
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
          >
            + Agregar Reserva
          </button>
        </div>
      </div>

      <ReservaTable reservas={currentData} />

      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      <AddReservaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReserva}
        encargados={encargados} 
      />
    </div>
  );
}