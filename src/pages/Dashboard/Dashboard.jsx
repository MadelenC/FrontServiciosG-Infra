import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DashboardChart from "./DashboardChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <PageMeta
        title="Dashboard | Sistema"
        description="Panel moderno de control"
      />

      <PageBreadcrumb pageTitle="Dashboard" />

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Control del Sistema
        </h1>
        <p className="text-sm text-gray-500">
          Monitoreo general en tiempo real
        </p>
      </div>

      {/* ================= KPIs (ESTADO DEL SISTEMA) ================= */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="p-4 rounded-xl border bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Actividad</p>
          <h2 className="text-xl font-bold">Alta</h2>
        </div>

        <div className="p-4 rounded-xl border bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Estado</p>
          <h2 className="text-xl font-bold text-green-500">Operativo</h2>
        </div>

        <div className="p-4 rounded-xl border bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Alertas</p>
          <h2 className="text-xl font-bold text-red-500">3</h2>
        </div>

        <div className="p-4 rounded-xl border bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Consumo</p>
          <h2 className="text-xl font-bold">Normal</h2>
        </div>

      </div>

      {/* ================= GRÁFICO ================= */}
      <DashboardChart />

      {/* ================= ALERTAS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="p-5 bg-white dark:bg-gray-900 border rounded-xl">
          <h2 className="font-semibold mb-3">Alertas del sistema</h2>
          <p>⚠ Vehículo 3825 - exceso de KM</p>
          <p>⚠ Vehículo 1224 - mantenimiento</p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 border rounded-xl">
          <h2 className="font-semibold mb-3">Últimos eventos</h2>
          <p>10:15 - viaje iniciado</p>
          <p>09:30 - combustible cargado</p>
        </div>

      </div>

      {/* ================= 📁 PDF / DOCUMENTOS ================= */}
      <div className="p-5 bg-white dark:bg-gray-900 border rounded-xl">

        <h2 className="font-semibold mb-4">
          Biblioteca de documentos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="p-4 border rounded-xl hover:shadow cursor-pointer">
            📄 Manual de Operaciones
          </div>

          <div className="p-4 border rounded-xl hover:shadow cursor-pointer">
            📊 Reporte Mensual
          </div>

          <div className="p-4 border rounded-xl hover:shadow cursor-pointer">
            🧾 Formularios de Viaje
          </div>

        </div>

      </div>

    </div>
  );
}