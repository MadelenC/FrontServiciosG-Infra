import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableUser from "../../components/Users/tables/TableUser";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <PageBreadcrumb pageTitle="" />

      <div className="space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen p-4">

        <ComponentCard title="Lista de Usuarios">
          <TableUser />
        </ComponentCard>

      </div>
    </>
  );
}
