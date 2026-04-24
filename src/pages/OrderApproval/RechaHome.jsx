import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import RechTable from "../../components/OrderApproval/Tables/Rech/RechTable";
export default function Maps() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="" />
      <div className="space-y-6 justify-center">
        <ComponentCard title="lista de rechazados">
          <RechTable />
        </ComponentCard>
      </div>
    </>
  );
}