import { useState, useEffect } from "react";
import { useMaintenanceStore } from "../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../zustand/useInstitutionStore";

export default function Reports() {

  const { maintenances, fetchMaintenances } = useMaintenanceStore();
  const { institutions, fetchInstitutions } = useInstitutionStore();

  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");

  useEffect(() => {
    fetchMaintenances();
    fetchInstitutions();
  }, []);

  const talleres = [
    ...new Set(maintenances.map(m => m.taller).filter(Boolean))
  ];

  const filtered = maintenances.filter((item) => {

    const matchStatus =
      !status || item.aprobacion === status;

    const matchTaller =
      !taller || item.taller === taller;

    const matchInstitution =
      !institution || String(item.institucion?.id) === String(institution);

    const matchMonth =
      !month || item.fecha?.slice(0, 7) === month;

    return (
      matchStatus &&
      matchTaller &&
      matchInstitution &&
      matchMonth
    );
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">

      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6">

        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            Reporte de Mantenimientos
          </h2>
         
        </div>

        <div className="flex flex-col gap-4">

          {/* MES */}
          <div>
            <label className="text-xs text-gray-500">Mes</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* ESTADO */}
          <div>
            <label className="text-xs text-gray-500">Aprovacion</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">selecione</option>
              <option value="pendiente">Pendiente</option>
              <option value="aceptado">Aceptado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>

          {/* TALLER */}
          <div>
            <label className="text-xs text-gray-500">Taller</label>
            <select
              value={taller}
              onChange={(e) => setTaller(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Seleccione un taller</option>
              {talleres.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* INSTITUCIÓN */}
          <div>
            <label className="text-xs text-gray-500">Seccion</label>
            <select
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Seleccione una Seccion</option>
              {institutions.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.nombre}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* BOTÓN IMPRIMIR CENTRADO */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Imprimir
          </button>
        </div>

        {/* RESULTADO */}
        <div className="text-center text-sm text-gray-600 border-t mt-4 pt-3">
          Total registros:{" "}
          <span className="font-bold text-gray-800">
            {filtered.length}
          </span>
        </div>

      </div>

    </div>
  );
}