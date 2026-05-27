import { useState, useEffect } from "react";
import SeccionesRow from "./SeccionesRow";
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";

import { useInstitutionStore } from "../../../zustand/useInstitutionStore";
import CreateSeccionesForm from "../Form/AddSeccForm";
import EditSeccionForm from "../Form/editForm";
import SearchBar from "../Search/SearchBar";

export default function SeccionesTable() {

 const {
  institutions,
   allInstitutions,
  loading,
  limit,
  page,
  totalPages,
  search,
  institution,
  fetchInstitutions,
  fetchAllInstitutions,
  setPage,
  setSearch,
  setInstitution,
  addInstitution,
  editInstitution,
  removeInstitution,
} = useInstitutionStore();

  

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedSeccion, setSelectedSeccion] = useState(null);

  useEffect(() => {
  fetchAllInstitutions();
}, []);

 useEffect(() => {

  const timeout = setTimeout(() => {

    fetchInstitutions();

  }, 500);

  return () => clearTimeout(timeout);

}, [
  page,
  search,
  institution,
  fetchInstitutions,
]);

const currentData =institutions;
const isInitialLoading =loading && institutions.length === 0;


 

  const handleSaveCreate = async (data) => {
    const res = await addInstitution(data);

    if (res?.ok) {
      fetchInstitutions();
      setModalCreateOpen(false);
    }

    return res;
  };


  const handleEdit = (inst) => {
    setSelectedSeccion(inst);
    setModalEditOpen(true);
  };


  const handleUpdate = async (data) => {
    const res = await editInstitution(selectedSeccion.id, data);

    if (res?.ok) {
      fetchInstitutions();
      setModalEditOpen(false);
    }

    return res;
  };

  const handleDelete = async (id) => {
  const res = await removeInstitution(id);

  if (res?.ok) {
    fetchInstitutions();
    setModalEditOpen(false);
  }

  return res;
};

if (isInitialLoading)
  return (
    <div className="p-6 text-center">
      Cargando instituciones...
    </div>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

  
      <div  className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 w-full ">

        <SearchBar
          search={search}
          setSearch={setSearch}
          institution={institution}
          setInstitution={setInstitution}
          listaInstituciones={allInstitutions}
        />

       <button
          onClick={() => setModalCreateOpen(true)}
          className=" inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600  to-blue-500 hover:from-blue-700
            hover:to-blue-600 text-white text-sm font-medium rounded-lg shadow-md transition-all bduration-200 hover:scale-[1.02] active:scale-95"
        >
          <FiPlus size={16} />
          <span>Agregar Institución</span>
        </button>

      </div>

   
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

        <table className="w-full text-sm bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              {["#", "Nombre", "Operación"].map((h) => (
                <th
                  key={h}
                  className="border px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((inst, i) => (
                <SeccionesRow
                  key={inst.id}
                  institution={inst}
                  index={(page - 1) * limit + i + 1}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No hay instituciones
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

    
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

  
      <CreateSeccionesForm
        isOpen={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onSave={handleSaveCreate}
      />

  
      <EditSeccionForm
        isOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        onSave={handleUpdate}
        onDelete={handleDelete} 
        instituciones={institutions}
        initialData={selectedSeccion}
      />

    </div>
  );
}