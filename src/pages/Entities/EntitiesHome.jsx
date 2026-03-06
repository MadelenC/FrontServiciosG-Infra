import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableEntitie from "../../components/Entities/tables/TableEntitie";

export default function EntitiePage() {
  return (
    <>
      <PageMeta
        title="Entidades | Panel de Administración"
        description="Gestión de entidades del sistema"
      />

      <PageBreadcrumb pageTitle="" />

      <div className="space-y-6">
        <ComponentCard title="Lista de Entidades">
          <TableEntitie />
        </ComponentCard>
      </div>
    </>
  );
}
