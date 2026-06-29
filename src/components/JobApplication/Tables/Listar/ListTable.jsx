import { useState, useEffect } from "react";
import ListRow from "./ListRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";
import ProtectedView from "../../../Protected/ProtectedView";
import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useAuthStore } from "../../../../zustand/AuthUsers";

import InsertForm from "../../Form/InsertForm";

export default function ListTable({ onAction }) {

  const {
    maintenances,
    fetchMaintenances,
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
    setPage(1);
    setAprobacion("pendiente");
  }, []);

  useEffect(() => {
  if (user?.tipo_serv === "administradorserv") {
    fetchMaintenances();
  } else {
    fetchMyInstitutionMaintenances();
  }

}, [page, search, taller, institution]);

  // traer TODOS los talleres e instituciones
  useEffect(() => {
    fetchAllTalleres();
    fetchAllInstitutions();
  }, []);

  const handleAction = async (action, item) => {

    if (action === "reject") {

      await editMaintenance(item.id, {
        aprobacion: "rechazado",
      });

      if (user?.tipo_serv === "administradorserv") {
        fetchMaintenances();
          } else {
            fetchMyInstitutionMaintenances();
          }
    }

    if (action === "accept") {

      await editMaintenance(item.id, {
        aprobacion: "aceptado",
      });

      if (user?.tipo_serv === "administradorserv") {
        fetchMaintenances();
      } else {
        fetchMyInstitutionMaintenances();
      }
    }
  };

  const currentData = maintenances;

  const handleSave = async (data) => {

    const result = await addMaintenance({
      ...data,
      user_id: user?.id,
      aprobacion: "pendiente",
    });

    if (result.ok) {
      await fetchAllTalleres();
      setOpenForm(false);
    }
  };

  const institucionesFormulario =
  user?.tipo_serv === "administradorserv"
    ? allInstitutions
    : allInstitutions.filter(
        (inst) =>
          user?.institutions?.some(
            (userInst) => userInst.id === inst.id
          )
      );
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4 dark:bg-gray-800">

      <div className="mb-2 text-sm text-gray-600">
        Tienes{" "}
        <span className="font-bold">{currentData.length}</span>
        pendientes
      </div>

      <div className="flex items-center justify-between mb-4">

        <div className="flex-1">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <ProtectedView  rolesAllowed={["encargadoserv","mantenimiento"]}>

        <button
          type="button"
          onClick={() => setOpenForm(true)}
          className="ml-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + Insertar
        </button>
        </ProtectedView>

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
                 "Ingresó",
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

                <ListRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={handleAction}
                />

              ))

            ) : (

              <tr>
                <td
                  colSpan={5}
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

        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

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
