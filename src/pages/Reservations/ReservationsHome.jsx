import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TableReserva from "../../components/Reservations/tables/TableReserva";
import PageMeta from "../../components/common/PageMeta";

export default function ReservationPage() {
  return (
    <>
      <PageMeta
        title="Reservas | Panel de Administración"
        description="Gestión de reservas del sistema"
      />

      <PageBreadcrumb pageTitle="Reservas" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Reservas
        </h3>

        <div className="space-y-6">
          <TableReserva />
        </div>
      </div>
    </>
  );
}