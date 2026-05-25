import { useState, useEffect } from "react";
import PedRow from "./PedRow";
import Pagination from "../Pagination";
import SearchBar from "../../SearchBar/SearchBar";

import { useOrderApprovalStore } from "../../../../zustand/useOrderApprovalStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";

export default function PedTable() {

  const {
    orders,
    fetchOrders,
    page,
    setPage,
    totalPages
  } = useOrderApprovalStore();

  const { institutions, fetchInstitutions } = useInstitutionStore();
  const { maintenances, fetchMaintenances } = useMaintenanceStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchInstitutions();
    fetchMaintenances();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

  
  const filteredOrders = orders.filter(
    (item) => item.aprobacion === "pendiente"
  );
  const handleAction = async (action, item) => {
  if (action === "reject") {
    await editOrder(item.id, {
      aprobacion: "rechazado",
    });
  }

  if (action === "accept") {
    await editOrder(item.id, {
      aprobacion: "aceptado",
    });
  }
};

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4 dark:bg-gray-800">

     
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
        <table className="w-full text-sm dark:text-gray-400">

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
                <th
                  key={h}
                  className="border px-3 py-2 text-left dark:bg-gray-800"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((item, i) => (
                <PedRow
                  key={item.id}
                  item={item}
                  index={i + 1}
                  onAction={handleAction}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No hay registros pendientes
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