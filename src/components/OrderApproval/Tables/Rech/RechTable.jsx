import { useState, useEffect, useMemo } from "react";
import PedRow from "./RechRow";
import Pagination from "../Pagination";
import SearchBar from "../../SearchBar/SearchBar";

import { useOrderApprovalStore } from "../../../../zustand/useOrderApprovalStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";

export default function RechTable() {

  const {
    orders,
    fetchOrders,
     editOrder, 
    page,
    setPage,
    totalPages
  } = useOrderApprovalStore();

  const { institutions, fetchInstitutions } = useInstitutionStore();
  const { maintenances, fetchMaintenances } = useMaintenanceStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");

  const limit = 8;

  useEffect(() => {
    fetchOrders();
    fetchInstitutions();
    fetchMaintenances();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

  
  const filtered = useMemo(() => {
    const searchText = search.toLowerCase();

    return orders.filter((item) => {

      const isRejected = item.aprobacion === "rechazado";

      const institucionNombre =
        item.institucion?.nombre?.toLowerCase() || "";

      const itemTaller =
        (item.taller || "").toLowerCase();

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

      return isRejected && matchSearch && matchTaller && matchInstitution;
    });
  }, [orders, search, taller, institution]);

  const currentData = useMemo(() => {
    return filtered.slice((page - 1) * limit, page * limit);
  }, [filtered, page]);

  const handleAction = async (action, item) => {
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
                <th
                  key={h}
                  className="border px-3 py-2 text-left dark:bg-gray-800 dark:text-gray-300"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, i) => (
                <PedRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={handleAction}   
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No hay registros rechazados
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