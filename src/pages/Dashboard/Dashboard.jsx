import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <PageMeta
        title="Dashboard | Infraestructura - UATF"
        description="Panel principal del sistema"
      />

      <PageBreadcrumb pageTitle="Dashboard" />

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          TABLERO DE CONTROL
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Resumen general del sistema de infraestructura
        </p>
      </div>

      {/* CARDS */}
      <DashboardCards />

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        <DashboardChart />

        {/* STATUS PANEL */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm">

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Estado del sistema
          </h2>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">

            <div className="flex justify-between">
              <span>Viajes activos</span>
              <span className="font-semibold">12</span>
            </div>

            <div className="flex justify-between">
              <span> Pendientes</span>
              <span className="font-semibold text-orange-500">3</span>
            </div>

            <div className="flex justify-between">
              <span>Autorizaciones</span>
              <span className="font-semibold text-green-500">45</span>
            </div>

            <div className="flex justify-between">
              <span>Usuarios</span>
              <span className="font-semibold">12</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}