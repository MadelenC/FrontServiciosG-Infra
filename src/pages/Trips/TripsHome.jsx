import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TripsTable from "../../components/Trips/tables/TripsTable";

export default function TripsPage() {
  return (
    <>
      <PageMeta
        title="Viajes | Panel de Administración"
        description="Gestión de viajes del sistema"
      />

      <PageBreadcrumb pageTitle="Lista de Viajes" />

      <div className="space-y-6">
        <ComponentCard title="Lista de Viajes">
          <TripsTable />
        </ComponentCard>
      </div>
    </>
  );
}