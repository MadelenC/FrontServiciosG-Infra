import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import AcceptTable from "../../components/JobApplication/Tables/Acep/AcepTable";

export default function AcceptHome() {
  return (
    <>
      <PageMeta
        title="Informes de Viajes | Panel de Administración"
        description="Gestión de informes de viajes del sistema"
      />

      <PageBreadcrumb pageTitle="Lista de Informes de Viajes" />

      <div className="space-y-6">
        <ComponentCard title="Informe de Trabajos Aceptados">
          < AcceptTable />
        </ComponentCard>
      </div>
    </>
  );
}