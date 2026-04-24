import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import ListTable from "../../components/JobApplication/Tables/Listar/ListTable";

export default function ListarHome() {
  return (
    <>
      <PageMeta
        title="Informes de Viajes | Panel de Administración"
        description="Gestión de informes de viajes del sistema"
      />

      <PageBreadcrumb pageTitle="Registro de Solicitud" />

      <div className="space-y-6">
        <ComponentCard title="Registro de Solicitud">
          <ListTable />
        </ComponentCard>
      </div>
    </>
  );
}