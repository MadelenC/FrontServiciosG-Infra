import { useEffect, useState } from "react";
import SearchBar from "../search/SearchBar";
import TableMaps from "./TableMaps";
import Pagination from "./Paginations";
import { useMapsStore } from "../../../zustand/useMapsStore";
import ModalMap from "./ModalMap";

export default function MapsTable() {
  const { maps, fetchMaps, loading, error } = useMapsStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalItem, setModalItem] = useState(null);
  const limit = 8;

  useEffect(() => {
    fetchMaps();
  }, [fetchMaps]); // 👈 mejora segura

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = maps.filter((m) =>
    Object.values(m).some(
      (v) => v && String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  if (loading) return <div className="p-4 text-center">Cargando mapas...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      
      <div className="flex justify-between items-center mb-4">
        <div className="h-10 w-64">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>

      {/* Tabla */}
      <TableMaps data={currentData} openModal={setModalItem} />

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {/* Modal */}
      {modalItem && (
        <ModalMap
          lat={modalItem.lat}
          lng={modalItem.lng}
          destino={modalItem.destino}
          onClose={() => setModalItem(null)}
        />
      )}

    </div>
  );
}