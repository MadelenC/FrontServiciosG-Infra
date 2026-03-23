import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import TripReportTable from "../../components/TripReport/Tables/TripReportTable";

export default function TripReportHome() {
  return (
    <>
      <PageMeta
        title="Informes de Viajes | Panel de Administración"
        description="Gestión de informes de viajes del sistema"
      />

      <PageBreadcrumb pageTitle="Lista de Informes de Viajes" />

      <div className="space-y-6">
        <ComponentCard title="Lista de Informes de Viajes">
          <TripReportTable />
        </ComponentCard>
      </div>
    </>
  );
}