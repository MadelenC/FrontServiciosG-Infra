import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import DepartureAuthorizationTable from "../../components/DepartureAuthorization/Tables/DepartureAuthorizationTable";

export default function DepartureHome() {
  return (
    <>
      <PageMeta
        title="Departure Authorizations | Infraestructura - UATF"
        description="Página de listado y control de autorizaciones de salida"
      />

      <PageBreadcrumb pageTitle="" />

      <div className="space-y-6 justify-center">
        <ComponentCard title=" Salidas">
          <DepartureAuthorizationTable />
        </ComponentCard>
      </div>
    </>
  );
}