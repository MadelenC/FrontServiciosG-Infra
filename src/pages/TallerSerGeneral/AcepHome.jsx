import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AcepTable from "../../components/TallerSerGeneral/Tables/Acep/AcepTable";

export default function ElecHome() {
  return (
    <>
      <PageMeta
        title="Solicitudes de Trabajo | Dashboard"
        description="Panel de control de solicitudes de trabajo con movilidad y accesorios"
      />
      <PageBreadcrumb pageTitle="Solicitudes de Trabajo" />

      <div className="space-y-6 justify-center">
        <ComponentCard title="kardex de mantenimiento">
          <AcepTable />
        </ComponentCard>
      </div>
    </>
  );
}