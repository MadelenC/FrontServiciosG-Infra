import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableReserva from "../../components/Reservations/tables/TableReserva";

export default function ReservationPage() {
  return (
    <>
      <PageMeta
        title="Reservas | Panel de Administración"
        description="Gestión de reservas del sistema"
      />

      <PageBreadcrumb pageTitle="" />

      <div className="space-y-6">
        <ComponentCard title="Lista de Reservas">
          <TableReserva />
        </ComponentCard>
      </div>
    </>
  );
}