import { useState, useEffect } from "react";
import AcepRow from "./AcepRow";
import Pagination from "../Pagination";
import SearchBar from "../../SearchBar/SearchBar";

import { useOrderApprovalStore } from "../../../../zustand/useOrderApprovalStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";

export default function AcepTable() {

  const {
    orders,
    fetchOrders,
    editOrder  
  } = useOrderApprovalStore();

  const { institutions, fetchInstitutions } = useInstitutionStore();
  const { maintenances, fetchMaintenances } = useMaintenanceStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetchOrders();
    fetchInstitutions();
    fetchMaintenances();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

  //  CAMBIO DE ESTADO
  const handleAction = async (action, item) => {

    if (action === "reject") {
      await editOrder(item.id, {
        ...item,
        aprobacion: "rechazado",   // 👈 AQUÍ CAMBIA
      });
    }

    if (action === "info") {
      console.log("ver info", item);
    }
  };

  const maintenanceMap = new Map(
    maintenances.map((m) => [String(m.id), m.descripcion])
  );

  const getDescripcion = (id) =>
    maintenanceMap.get(String(id)) || "-";

  // SOLO ACEPTADOS
  const filtered = orders.filter((item) => {

    const searchText = search.toLowerCase();

    const institucionNombre =
      item.ins_id?.toString().toLowerCase() || "";

    const itemTaller =
      (item.taller || "").toLowerCase();

    const isAccepted = item.aprobacion === "aceptado";

    const matchSearch =
      !search ||
      String(item.id || "").includes(searchText) ||
      institucionNombre.includes(searchText) ||
      itemTaller.includes(searchText);

    const matchTaller =
      !taller || itemTaller === taller.toLowerCase();

    const matchInstitution =
      !institution ||
      String(item.ins_id) === String(institution);

    return isAccepted && matchSearch && matchTaller && matchInstitution;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4">

      <div className="mb-4">
        <SearchBar
          search={search}
          setSearch={setSearch}
          taller={taller}
          setTaller={setTaller}
          institution={institution}
          setInstitution={setInstitution}
          listaTalleres={[
            ...new Set(orders.map(o => o.taller).filter(Boolean))
          ]}
          listaInstituciones={institutions}
        />
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-blue-50">
            <tr>
              {[
                "#",
                "N°",
                "Sección",
                "Descripción",
                "Taller",
                "Aprobación",
                "Operaciones"
              ].map((h) => (
                <th key={h} className="border px-3 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, i) => (
                <AcepRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  getDescripcion={getDescripcion}
                  onAction={handleAction}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

    </div>
  );
}