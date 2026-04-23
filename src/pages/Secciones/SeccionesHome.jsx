import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SeccionesTable from "../../components/Secciones/Tables/SeccionesTable";

export default function JobApplications() {
  return (
    <>
      <PageMeta
        title="Secciones | Dashboard"
        description="Panel de control de solicitudes de trabajo con movilidad y accesorios"
      />
      <PageBreadcrumb pageTitle="" />

      <div className="space-y-6 justify-center ">
        <ComponentCard title=" Lista de Secciones">
          <SeccionesTable/>
        </ComponentCard>
      </div>
    </>
  );
}