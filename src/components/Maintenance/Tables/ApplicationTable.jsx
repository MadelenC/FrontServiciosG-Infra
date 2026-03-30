import { useState, useEffect } from "react";
import JobApplicationRow from "./ApplicationRow";
import SearchBarApplication from "../Search/SearchBar"; 
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";
import CreateJobForm from "../Form/CreateJobForm"; 
import MaterialRequestForm from "../Form/MaterialRequestForm";
import { useJobApplicationStore } from "../../../zustand/useJobApplicationStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useAccessoriesStore } from "../../../zustand/useAccessories";
import { useUserStore } from "../../../zustand/userStore"; 

export default function ApplicationTable() {
  const {
    applications,
    fetchApplications,
    addApplication,
    editApplication,
  } = useJobApplicationStore();

  const { vehicles, fetchVehicles } = useVehicleStore();
  const { accessories, fetchAccessories } = useAccessoriesStore();
  const { users, fetchUsers } = useUserStore(); 
  const [chofer, setChofer] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [selectedJobApplication, setSelectedJobApplication] = useState(null);
  const [materialRequestOpen, setMaterialRequestOpen] = useState(false);
const [selectedMaterialApplication, setSelectedMaterialApplication] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchApplications();
    fetchVehicles();
    fetchAccessories();
    fetchUsers();
  }, []);

  useEffect(() => setPage(1), [search, chofer, vehiculo]);

  const handleOpenCreate = () => {
    setModalType("add");
  };

  const handleEdit = (app) => {
    setSelectedApplication(app);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedApplication(null);
  };

  const handleSaveCreate = async (data) => {
    const res = await addApplication(data);
    if (res?.ok) fetchApplications();
    return res;
  };

  const handleSaveEdit = async (data) => {
    const res = await editApplication(selectedApplication.id, data);
    if (res?.ok) {
      fetchApplications();
      alert("✅ Actualización exitosa");
    }
    return res;
  };

  const handleOpenJobForm = (application) => {
    setSelectedJobApplication(application);
    setJobFormOpen(true);
  };

  const handleCloseJobForm = () => {
    setJobFormOpen(false);
    setSelectedJobApplication(null);
  };

  const handleOpenMaterialRequestForm = (application) => {
  setSelectedMaterialApplication(application);
  setMaterialRequestOpen(true);
};

const handleCloseMaterialRequestForm = () => {
  setMaterialRequestOpen(false);
  setSelectedMaterialApplication(null);
};
  const choferes = users?.filter(u => u.tipo && u.tipo.toLowerCase() === "chofer");
  const filtered = applications.filter((a) => {
      const choferNombre = a.chofer
        ? `${a.chofer.nombres || ""} ${a.chofer.apellidos || ""}`.toLowerCase()
        : "";

      const matchChofer = chofer
        ? choferNombre.includes(chofer.toLowerCase())
        : true;

      const idVehiculo = a.vehiculo?.id ? String(a.vehiculo.id) : "";
      const tipoVehiculo = a.vehiculo?.tipog ? String(a.vehiculo.tipog).toLowerCase() : "";
      const matchVehiculo = vehiculo
        ? idVehiculo === vehiculo || tipoVehiculo.includes(vehiculo.toLowerCase())
        : true;

      return matchChofer && matchVehiculo;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <SearchBarApplication
          chofer={chofer}
          setChofer={setChofer}
          vehiculo={vehiculo}
          setVehiculo={setVehiculo}
          listaChoferes={(choferes || []).map(c => ({
            value: `${c.nombres} ${c.apellidos}`,
            label: `${c.nombres} ${c.apellidos}`
          }))}
          listaVehiculos={vehicles}
        />

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-orange-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Imprimir
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 ">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Chofer</th>
              <th className="border px-3 py-2">Vehículo</th>
              <th className="border px-3 py-2">Accesorios</th>
              <th className="border px-3 py-2">Descripción</th>
              <th className="border px-3 py-2">Fecha</th>
              <th className="border px-3 py-2">Operación</th>
              <th className="border px-3 py-2">Trabajos</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((a, i) => (
                <JobApplicationRow
                  key={a.id}
                  application={a}
                  index={i + 1}
                  onEdit={handleEdit}
                  onConcretar={handleOpenJobForm} 
                  onPedido={handleOpenMaterialRequestForm}
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
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {/* FORMULARIO MODAL concretar */}
      {jobFormOpen && selectedJobApplication && (
        <CreateJobForm
          isOpen={jobFormOpen}
          onClose={handleCloseJobForm}
          application={selectedJobApplication}
          onSave={async (data) => {
            // Aquí guardas el trabajo realizado, luego refrescas la lista y cierras modal
            // Ejemplo (debes adaptar según tu store/api):
            // await saveJob(data); 
            // fetchApplications();
            setJobFormOpen(false);
            return { ok: true };
          }}
        />
      )}

      {materialRequestOpen && selectedMaterialApplication && (
        <MaterialRequestForm
          isOpen={materialRequestOpen}
          onClose={handleCloseMaterialRequestForm}
          onSave={async (data) => {
            // Aquí guardas la petición de material
            // Puedes usar selectedMaterialApplication si necesitas datos para el guardado
            // Ejemplo:
            // await saveMaterialRequest(data);
            // fetchApplications();
            setMaterialRequestOpen(false);
            return { ok: true };
          }}
        />
      )}

    </div>
  );
}