import { useState, useEffect } from "react";
import ListRow from "./ListRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";

export default function ListTable({ onAction }) {

  const { maintenances, fetchMaintenances } = useMaintenanceStore();
  const { institutions, fetchInstitutions } = useInstitutionStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetchMaintenances();
    fetchInstitutions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

 
  const sorted = [...maintenances].sort((a, b) => b.id - a.id);


  const filtered = sorted.filter((item) => {

    const isPending =
      item.aprobacion?.toLowerCase() === "pendiente";

    const searchText = search.toLowerCase();

    const institucionNombre =
      item.institucion?.nombre?.toLowerCase() || "";

    const itemTaller =
      (item.taller || "").toLowerCase();

    const matchSearch =
      !search ||
      (item.descripcion || "").toLowerCase().includes(searchText) ||
      itemTaller.includes(searchText) ||
      institucionNombre.includes(searchText) ||
      String(item.id_nro || "").includes(searchText);

    const matchInstitution =
      !institution ||
      String(item.institucion?.id) === String(institution);

    const matchTaller =
      !taller ||
      itemTaller === taller.toLowerCase();

    return isPending && matchSearch && matchInstitution && matchTaller;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4">

      {/* HEADER */}
      <div className="mb-4">
        <SearchBar
          search={search}
          setSearch={setSearch}
          
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {[
                "#",
                "Sección",
                "Descripción",
                "Taller",
                "Operación"
              ].map((h) => (
                <th key={h} className="border px-3 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, i) => (
                <ListRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={onAction}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

    </div>
  );
}