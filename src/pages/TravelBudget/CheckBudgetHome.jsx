import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableCheckBudget from "../../components/TravelBudgets/tables/TableCheckBudge";

export default function CheckBudgetPage() {
  return (
    <>
      <PageMeta
        title="Presupuestos con Cheque | Panel de Administración"
        description="Gestión de presupuestos de viaje con cheque"
      />

      <PageBreadcrumb pageTitle="" />

      <div className="space-y-6">
        <ComponentCard title="Lista de Presupuestos con Cheque">
          <TableCheckBudget />
        </ComponentCard>
      </div>
    </>
  );
}