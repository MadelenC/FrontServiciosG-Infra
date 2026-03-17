import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableCashBudget from "../../components/TravelBudgets/tables/TableCashBudget";

export default function CashBudgetPage() {
  return (
    <>
      <PageMeta
        title="Presupuestos en Caja | Panel de Administración"
        description="Gestión de presupuestos de viaje en efectivo"
      />

      <PageBreadcrumb pageTitle="" />

      <div className="space-y-6">
        <ComponentCard title="Lista de Presupuestos en Caja">
          <TableCashBudget />
        </ComponentCard>
      </div>
    </>
  );
}