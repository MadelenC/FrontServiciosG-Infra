import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import UnidTable from "../../components/JobApplication/Tables/Unid/UnidTable";

export default function UnidHome() {
  return (
    <>
      <PageMeta
        title="Informes de Viajes | Panel de Administración"
        description="Gestión de informes de viajes del sistema"
      />

      <PageBreadcrumb pageTitle="Registro de Solicitud" />

      <div className="space-y-6">
        <ComponentCard title="Registro de Solicitud">
          <UnidTable/>
        </ComponentCard>
      </div>
    </>
  );
}