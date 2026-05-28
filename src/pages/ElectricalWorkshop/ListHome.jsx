import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ListTable from "../../components/ElectricalWorkshop/Tables/List/ListTable";

export default function ListHome() {
  return (
    <>
      <PageMeta
        title="Solicitudes de Trabajo | Dashboard"
        description="Panel de control de solicitudes de trabajo con movilidad y accesorios"
      />
      <PageBreadcrumb pageTitle="Lista de Solicitudes de Trabajo" />

      <div className="space-y-6 justify-center">
        <ComponentCard title="Lista de Solicitudes de Trabajo">
          <ListTable/>
        </ComponentCard>
      </div>
    </>
  );
}