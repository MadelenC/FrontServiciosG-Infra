import { useState, useEffect } from "react";

import PedRow from "./AcepRow";
import Pagination from "../Pagination";
import SearchBar from "../../SearchBar/SearchBar";

import { useOrderApprovalStore } from "../../../../zustand/useOrderApprovalStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";

export default function AcepTable() {

  const {
    orders,
    fetchOrders,
    editOrder,

    page,
    setPage,

    totalPages,

    setSearch: setStoreSearch,
    setTaller: setStoreTaller,
    setInstitution: setStoreInstitution,
    setAprobacion,

  } = useOrderApprovalStore();

  const {
    allInstitutions,
    fetchAllInstitutions,
  } = useInstitutionStore();

  const {
    allTalleres,
    fetchAllTalleres,
  } = useMaintenanceStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");

  useEffect(() => {

    fetchAllInstitutions();
    fetchAllTalleres();

  }, []);

  useEffect(() => {

    setStoreSearch(search);
    setStoreTaller(taller);
    setStoreInstitution(institution);

    setAprobacion("aceptado");

  }, [search, taller, institution]);

  useEffect(() => {

    fetchOrders();

  }, [page, search, taller, institution]);

  const handleAction = async (action, item) => {

    if (action === "reject") {

      await editOrder(item.id, {
        aprobacion: "rechazado",
      });

      fetchOrders();
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

          listaTalleres={allTalleres}

          listaInstituciones={allInstitutions}

        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm dark:text-gray-400 border">

          <thead className="bg-blue-50 dark:bg-gray-800">

            <tr>

              {[
                "#",
                "N°",
                "Sección",
                "Descripción",
                "Taller",
                "Aprobación",
                "Operaciones",
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

            {orders.length > 0 ? (

              orders.map((item, i) => (

                <PedRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * 8 + i + 1}
                  onAction={handleAction}
                />

              ))

            ) : (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-4"
                >
                  No hay registros aceptados
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