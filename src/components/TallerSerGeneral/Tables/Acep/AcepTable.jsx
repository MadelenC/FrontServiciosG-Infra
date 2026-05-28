import { useEffect, useState} from "react";
import AcepRow from "./AcepRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import InformeRechazadoForm from "../../Form/RechForm";

export default function AcepElecTable() {

  const {
    maintenances,
    fetchMaintenances,
    editMaintenance,
     allTalleres,
    fetchAllTalleres,
    page,
    totalPages,
    search,
    taller,
    institution,
    setPage,
    setSearch,
    setTaller,
    setInstitution,
  } = useMaintenanceStore();

  const { allInstitutions,fetchAllInstitutions} = useInstitutionStore();
  const [openForm, setOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {

  fetchAllInstitutions();
  fetchAllTalleres();

  setPage(1);
  setSearch("");
  setTaller("");
  setInstitution("");

}, []);


  useEffect(() => {

    fetchMaintenances({
      aprobacion: "aceptado",
    });

  }, [page, search, taller, institution]);
const handleAction = async (  action,   item ) => {

    if (action === "informe") {
    setSelectedItem(item);
    setOpenForm(true);
    return;
  }

    let nuevoEstado = "";

    if (action === "reject") {
      nuevoEstado = "rechazado";
    }

    const result =
      await editMaintenance(
        item.id,
        {
          aprobacion: nuevoEstado,
        }
      );

    
    if (result.ok) {

      fetchMaintenances({
        aprobacion: "aceptado",
      });

    }

  };
   const handleRegisterInforme = async (data) => {
  await editMaintenance(selectedItem.id, {
    informe: data.informe,   
  });

  fetchMaintenances({ aprobacion: "rechazado" });
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
          listaTalleres={allTalleres}
          listaInstituciones={allInstitutions}
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

                <th
                  key={h}
                  className="border px-3 py-2 text-left dark:bg-gray-800 dark:text-gray-400"
                >
                  {h}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {maintenances.length > 0 ? (

              maintenances.map((item, i) => (

                <AcepRow
                  key={item.id}
                  item={item}
                  index={i + 1}
                  onAction={handleAction}
                />

              ))

            ) : (

              <tr>

                <td
                  colSpan={8}
                  className="text-center py-4"
                >
                  No hay registros
                </td>

              </tr>

            )}

          </tbody>

        </table>

         {openForm && (
                  <InformeRechazadoForm
                    item={selectedItem}
                    onClose={() => setOpenForm(false)}
                    onRegister={handleRegisterInforme}
                  />
                )}

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