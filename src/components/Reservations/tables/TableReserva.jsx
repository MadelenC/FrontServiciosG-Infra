import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../search/SearchBar";
import ReservaTable from "./ReservaTable";
import Pagination from "./Paginations";
import AddReservaModal from "./../form/AddRerservaForm";
import { useReservaStore } from "../../../zustand/useReservationsStore";
import { useUserStore } from "../../../zustand/userStore"; 

export default function TableReserva() {
  const { reservas, fetchReservas, loading, error, addReserva } = useReservaStore();
  const { users, fetchUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const limit = 8;

  useEffect(() => {
    fetchReservas();
    fetchUsers();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = reservas.filter((r) =>
    r.entidad?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);
  const encargados = users?.filter(u => u.tipo === "encargado") || [];

  const handleSaveReserva = async (data) => {
    setSaving(true);
    const response = await addReserva(data); 
    setSaving(false);

    if (response.ok) {
      await fetchReservas(); 
      setIsModalOpen(false); 
    } else {
      alert("Error al guardar: " + response.error);
    }
  }

  if (loading)
    return <div className="p-4 text-center text-gray-600 dark:text-gray-300">Cargando reservas...</div>;

  if (error)
    return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 transition-all">

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-4 gap-4">

        <SearchBar search={search} setSearch={setSearch} />

        <div className="flex gap-2 flex-wrap">

          <button className="flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 dark:from-orange-600 dark:to-orange-500 dark:hover:from-orange-700 dark:hover:to-orange-600 text-white px-5 py-3 rounded-lg shadow-lg font-medium transition">
            Imprimir
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 text-white px-5 py-3 rounded-lg shadow-lg font-medium transition"
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