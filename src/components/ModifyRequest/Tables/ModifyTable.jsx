import { useState, useEffect } from "react";
import ModifyRow from "./ModifyRow";
import Pagination from "./Pagination";
import { useMaintenanceStore,} from "../../../zustand/useMaintenanceStore";
import {useInstitutionStore,} from "../../../zustand/useInstitutionStore";
import SearchBar from "../Search/SearchBar";
import EditMaintenanceForm from "../Form/EditModifyForm";
import useDebounce from "../../../hooks/useDebounce";

export default function ModifyTable() {
  const {maintenances,loading, page,totalPages,search,taller,fetchTalleres,talleres,
    institution,fetchMaintenances, setPage,setSearch, setTaller,setInstitution,
    removeMaintenance,editMaintenance,resetFilters,} = useMaintenanceStore();

  const {
    allInstitutions,
    fetchAllInstitutions,
  } = useInstitutionStore();
  const [modalEditOpen, setModalEditOpen] =useState(false);
  const [selectedItem, setSelectedItem] =useState(null);
  const debouncedSearch =useDebounce(search, 500);
  const debouncedTaller =useDebounce(taller, 500);
const debouncedInstitution =useDebounce(institution, 500);

  useEffect(() => {
    resetFilters();
    fetchAllInstitutions();
    fetchTalleres();
  }, []);

 useEffect(() => {

  fetchMaintenances();

}, [
  page,
  debouncedSearch,
  debouncedTaller,
  debouncedInstitution,
]);

  const currentData = maintenances;
  if (loading && maintenances.length === 0) {
    return (
      <div className="p-6 text-center">
      Cargando mantenimientos...
      </div>
    );
  }

  const handleAction = ( type, item) => {
    if (type === "edit") {
      setSelectedItem(item);
      setModalEditOpen(true);
    }
    if (type === "print") {
      window.print();
    }
  };
  const handleDelete = async (id) => {
    const res =
      await removeMaintenance(id);
    if (res?.ok) {
      fetchMaintenances();
    }
  };

  const handleUpdate = async (data) => {
    const res =
      await editMaintenance(
        selectedItem.id,
        data
      );
    if (res?.ok) {
      fetchMaintenances();
      setModalEditOpen(false);
    }
   return res;
  };
const isInitialLoading =
  loading && maintenances.length === 0;

if (isInitialLoading) {
  return (
    <div className="p-6 text-center">
      Cargando mantenimientos...
    </div>
  );
}
  return (

    <div
      className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md  p-4 "  >
      <div  className=" flex  flex-col  md:flex-row  justify-between  items-center   mb-4  gap-3  "  >
        <SearchBar
          search={search}
          setSearch={setSearch}
          taller={taller}
          setTaller={setTaller}
          institution={institution}
          setInstitution={setInstitution}
          listaTalleres={talleres}
          listaInstituciones={
            allInstitutions
          }
        />
      </div>
      <div
        className="overflow-x-auto  rounded-xl  border  shadow-sm dark:border-gray-500 dark:text-gray-400 " >
        <table className="w-full text-sm">
          <thead className=" bg-gradient-to-r  from-blue-50 to-blue-100 "  >
            <tr>
              {[
                "#",
                "N°",
                "Sección",
                "Descripción",
                "Taller",
                "Operación",
              ].map((h) => (
               <th
                  key={h}
                  className="
                    border
                    px-3
                    py-2
                    text-left
                    dark:bg-gray-800
                    dark:border-gray-500
                  "
                >
                  {h}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {currentData.length > 0 ? (

              currentData.map(
                (item, i) => (

                  <ModifyRow

                    key={item.id}

                    item={item}

                    index={
                      ((page - 1) * 8)
                      + i
                      + 1
                    }

                    onAction={
                      handleAction
                    }

                    institutions={
                      allInstitutions
                    }

                  />

                )
              )

            ) : (

              <tr>

                <td
                  colSpan={6}
                  className="
                    text-center
                    py-4
                  "
                >
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination page={page}  totalPages={totalPages}  setPage={setPage} />
      </div>

      <EditMaintenanceForm
        isOpen={modalEditOpen}
        onClose={() =>
          setModalEditOpen(false)
        }
        initialData={selectedItem}
        listaInstituciones={
          allInstitutions
        }
        listaTalleres={[
          { id: 1, nombre: "Interno" },
          { id: 2, nombre: "Externo" },
        ]}
        onSave={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}