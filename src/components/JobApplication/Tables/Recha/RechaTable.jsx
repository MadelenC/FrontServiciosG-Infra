import { useState, useEffect } from "react";
import RechRow from "./RechaRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useAuthStore } from "../../../../zustand/AuthUsers";

export default function RechaTable() {

  const {
    maintenances,
    fetchMaintenances,
    editMaintenance,
  } = useMaintenanceStore();

  const {
    institutions,
    fetchInstitutions,
  } = useInstitutionStore();

  const { user } = useAuthStore();

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


  const filtered = maintenances.filter(
  (item) =>
    item.aprobacion?.toLowerCase() === "rechazado"
);

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

 
  

  const handleAction = async (action, item) => {

  if (action === "accept") {

    await editMaintenance(item.id, {
      aprobacion: "aceptado",
    });

  }
fetchMaintenances();
};

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4 dark:bg-gray-800">

      <div className="mb-4">
        <SearchBar
          search={search}
          setSearch={setSearch}
          taller={taller}
          setTaller={setTaller}
          institution={institution}
          setInstitution={setInstitution}
          listaTalleres={[
            ...new Set(maintenances.map(m => m.taller).filter(Boolean))
          ].map((t, i) => ({ id: i, nombre: t }))}
          listaInstituciones={institutions}
        />
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:text-gray-300">
            <tr>
              {[
                "#",
                "N°",
                "Sección",
                "Descripción",
                "Taller",
                "Aprobación",
                "Informe",
                "Operaciones"
              ].map((h) => (
                <th key={h} className="border px-3 py-2 text-left dark:bg-gray-800">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, i) => (
                <RechRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={handleAction}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No hay registros rechazados
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

    </div>
  );
}