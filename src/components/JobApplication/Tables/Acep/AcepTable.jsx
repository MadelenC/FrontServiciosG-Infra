import { useState, useEffect } from "react";
import AcepRow from "./AcepRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useAuthStore } from "../../../../zustand/AuthUsers";

import InformeForm from "../../Form/InformeForm";

export default function AcepTable() {

  const {
    maintenances,
    fetchMaintenances,
    editMaintenance,
    page,
    limit,
    totalPages,

    setPage,
    setSearch: setStoreSearch,
    setTaller: setStoreTaller,
    setInstitution: setStoreInstitution,
    setAprobacion,

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

  const [selectedItem, setSelectedItem] =
    useState(null);

  useEffect(() => {

    setAprobacion("aceptado");

    fetchInstitutions();

  }, []);

  useEffect(() => {

    setStoreSearch(search);
    setStoreTaller(taller);
    setStoreInstitution(institution);

  }, [search, taller, institution]);

  useEffect(() => {

    fetchMaintenances();

  }, [page, search, taller, institution]);

  const filtered = maintenances.filter(
    (item) =>
      item.aprobacion?.toLowerCase() === "aceptado"
  );

  const handleAction = async (action, item) => {

    // rechazar
    if (action === "reject") {

      await editMaintenance(item.id, {
        aprobacion: "rechazado",
      });

    }

    // abrir informe
    if (action === "informe") {

      setSelectedItem(item);

      setOpenForm(true);

    }

  };

  // guardar informe
  const handleSaveInforme = async (data) => {

    await editMaintenance(selectedItem.id, {
      informe: data.tarea,
    });

    fetchMaintenances();

    setOpenForm(false);

    setSelectedItem(null);
  };

  return (

    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4 dark:bg-gray-900">

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

      <div className="overflow-x-auto dark:border-gray-600">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">

            <tr>

              {[
                "#",
                "N°",
                "Sección",
                "Descripción",
                "Taller",
                "Aprobación",
                "Informe",
                "Operaciones",
              ].map((h) => (

                <th
                  key={h}
                  className="
                    border px-3 py-2 text-left
                    dark:bg-gray-800 dark:text-gray-400
                  "
                >
                  {h}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map((item, i) => (

                <AcepRow
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
                  No hay registros aceptados
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