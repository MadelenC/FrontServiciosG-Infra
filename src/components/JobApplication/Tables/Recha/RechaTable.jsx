import { useState, useEffect } from "react";
import RechRow from "./RechaRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useAuthStore } from "../../../../zustand/AuthUsers";

import InformeForm from "../../Form/InformeForm";

export default function RechaTable() {

  const {
    maintenances,
    fetchMaintenances,
    fetchMyInstitutionMaintenances,
    editMaintenance,
    setAprobacion,
    setSearch: setStoreSearch,
    setTaller: setStoreTaller,
    setInstitution: setStoreInstitution,
    totalPages,
    limit,
    page,
    setPage,
  } = useMaintenanceStore();

  const {
    institutions,
    fetchInstitutions,
  } = useInstitutionStore();

  const { user } = useAuthStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");

  

  const [openForm, setOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {

    setStoreSearch(search);
    setStoreTaller(taller);
    setStoreInstitution(institution);

  }, [search, taller, institution]);

  useEffect(() => {
  setAprobacion("rechazado");
  fetchInstitutions();
}, []);

useEffect(() => {

  if (!user) return;

  if (user.tipo_serv === "administradorserv") {
    fetchMaintenances();
  } else {
    fetchMyInstitutionMaintenances();
  }

}, [page, search, taller, institution, user]);

  useEffect(() => {

    setPage(1);

  }, [search, taller, institution]);

const currentData = maintenances;

  const handleAction = async (
    action,
    item
  ) => {

    // aceptar nuevamente
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

    // abrir informe
    if (action === "informe") {

      setSelectedItem(item);

      setOpenForm(true);

    }

  };

  // guardar informe
  const handleSaveInforme = async (
    data
  ) => {

    await editMaintenance(
      selectedItem.id,
      {
        informe: data.tarea,
      }
    );

    if (user?.tipo_serv === "administradorserv") {
      fetchMaintenances();
    } else {
      fetchMyInstitutionMaintenances();
    }

    setOpenForm(false);

    setSelectedItem(null);

  };

  return (

    <div className="
      overflow-hidden rounded-xl border
      bg-white shadow-md p-4
      dark:bg-gray-800
    ">

      <div className="mb-4">

        <SearchBar
          search={search}
          setSearch={setSearch}

          taller={taller}
          setTaller={setTaller}

          institution={institution}
          setInstitution={setInstitution}

          listaTalleres={[
            ...new Set(
              maintenances
                .map((m) => m.taller)
                .filter(Boolean)
            )
          ].map((t, i) => ({
            id: i,
            nombre: t,
          }))}

          listaInstituciones={institutions}
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="
            bg-gradient-to-r
            from-blue-50 to-blue-100
            dark:text-gray-300
          ">

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

                <th
                  key={h}
                  className="
                    border px-3 py-2 text-left
                    dark:bg-gray-800
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

                <RechRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={handleAction}
                />

              ))

            ) : (

              <tr>

                <td
                  colSpan={8}
                  className="text-center py-4"
                >
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

      <InformeForm
        isOpen={openForm}
        onClose={() => {

          setOpenForm(false);

          setSelectedItem(null);

        }}
        onSave={handleSaveInforme}
      />

    </div>
  );
}