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
    fetchInstitutions,
    addInstitution,
    editInstitution,
      removeInstitution,
  } = useInstitutionStore();

  const [search, setSearch] = useState("");
  const [institution, setInstitution] = useState("");
  const [page, setPage] = useState(1);

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedSeccion, setSelectedSeccion] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchInstitutions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, institution]);

 
  const sortedInstitutions = [...institutions].sort(
    (a, b) => b.id - a.id
  );


  const filtered = sortedInstitutions.filter((inst) => {
    const matchSearch =
      !search ||
      inst.nombre?.toLowerCase().includes(search.toLowerCase());

    const matchInstitution =
      !institution || String(inst.id) === String(institution);

    return matchSearch && matchInstitution;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );


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



  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <SearchBar
          institution={institution}
          setInstitution={setInstitution}
          listaInstituciones={institutions}
        />

        <button
          onClick={() => setModalCreateOpen(true)}
          className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500
          hover:from-blue-700 hover:to-blue-600 text-white px-5 py-3 rounded-lg shadow-lg font-medium
          transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <FiPlus size={18} />
          Agregar Institución
        </button>

      </div>

      {/* TABLE */}
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

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {/* CREATE MODAL */}
      <CreateSeccionesForm
        isOpen={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onSave={handleSaveCreate}
      />

      {/* EDIT MODAL */}
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