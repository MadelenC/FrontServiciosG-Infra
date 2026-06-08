
import { useState, useEffect } from "react";
import UnidRow from "./UnidRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useAuthStore } from "../../../../zustand/AuthUsers";


import InsertForm from "../../Form/InsertForm";

export default function UnidTable({ onAction }) {

  const {
    maintenances,
    fetchMyInstitutionMaintenances,
    addMaintenance,
    editMaintenance,
    allTalleres,
    fetchAllTalleres,
    search,
    taller,
    institution,
    page,
    limit,
    totalPages,
    setSearch,
    setTaller,
    setInstitution,
    setPage,
    setAprobacion,

  } = useMaintenanceStore();

  const {
    allInstitutions,
    fetchAllInstitutions,
  } = useInstitutionStore();

  const { user } = useAuthStore();
  const [openForm, setOpenForm] = useState(false);

 useEffect(() => {
  setAprobacion("");
}, []);

useEffect(() => {
  fetchMyInstitutionMaintenances();
}, [page, search, taller, institution, user]);

  useEffect(() => {
    fetchAllTalleres();
  }, []);

  const handleAction = async (action, item) => {
    if (action === "reject") {
      await editMaintenance(item.id, {
        aprobacion: "rechazado",
      });
      fetchMyInstitutionMaintenances();
    }

    if (action === "accept") {
      await editMaintenance(item.id, {
        aprobacion: "aceptado",
      });
      fetchMyInstitutionMaintenances();
    }
  };



const currentData =
  user?.institutions?.length > 0
    ? (maintenances || []).filter(
        (item) =>
          user.institutions.some(
            (inst) =>
              inst.id ===
              (
                item?.institution_id ||
                item?.institution?.id ||
                item?.institucion?.id
              )
          )
      )
    : [];



  const handleSave = async (data) => {

    const result = await addMaintenance({
      ...data,
      user_id: user?.id,
      aprobacion: "pendiente",
    });

    if (result.ok) {

      setOpenForm(false);

      fetchMyInstitutionMaintenances();
    }
  };

  const institucionesFormulario =
    allInstitutions?.filter(
      (inst) =>
        user?.institutions?.some(
          (userInst) => userInst.id === inst.id
        )
    ) || [];

  return (

    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4 dark:bg-gray-800">

      <div className="mb-2 text-sm text-gray-600">
        Tienes{" "}
        <span className="font-bold">
          {currentData.length}
        </span>{" "}
        registros
      </div>

      <div className="flex items-center justify-between mb-4">

        <div className="flex-1">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <button
          onClick={() => setOpenForm(true)}
          className="
            flex items-center gap-3
            bg-gradient-to-r from-blue-600 to-blue-500
            hover:from-blue-700 hover:to-blue-600
            text-white px-4 py-3 rounded-lg
            shadow-lg font-medium ml-4
          "
        >
          + Insertar
        </button>

      </div>

      <div className="overflow-x-auto rounded-xl border shadow-sm dark:border-gray-500">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">

            <tr>
              {[
                "#",
                "Sección",
                "Descripción",
                "Taller",
                "Estado",
                "Operación",
              ].map((h) => (
                <th
                  key={h}
                  className="
                    border px-3 py-2 text-left
                    dark:bg-gray-800 dark:text-gray-300
                  "
                >
                  {h}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {currentData.length > 0 ? (
              currentData.map((item, i) => (
                <UnidRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={handleAction}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No hay registros
                </td>
              </tr>

            )}

          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
      {currentData.length > 0 && (
        <Pagination
          page={page || 1}
          totalPages={totalPages || 1}
          setPage={setPage}
        />
      )}
      </div>
      <InsertForm
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        listaInstituciones={institucionesFormulario}
        listaTalleres={allTalleres}
      />

    </div>
  );
}

