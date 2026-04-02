import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ApplicationTable from "../../components/Maintenance/Tables/ApplicationTable";

export default function ApplicationHome() {
  return (
    <>
      <PageMeta
        title="Solicitudes de Trabajo | Dashboard"
        description="Panel de control de solicitudes de trabajo con movilidad y accesorios"
      />
      <PageBreadcrumb pageTitle="Lista de Solicitudes de Trabajo" />

      <div className="space-y-6 justify-center">
        <ComponentCard title="Lista de Solicitudes de Trabajo">
          <ApplicationTable/>
        </ComponentCard>
      </div>
    </>
  );
}