import { useEffect, useState  } from "react";
import ListRow from "./ListRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";
import { useOrderApprovalStore } from "../../../../zustand/useOrderApprovalStore";
import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import MaterialRequestForm from "../../Form/MaterialRequestForm";


export default function ListTableElec() {

const [openPedido, setOpenPedido] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const { addOrder } = useOrderApprovalStore();

  const {
    maintenances,
    fetchMaintenances,
    editMaintenance,
    allTalleres,
  fetchAllTalleres,
    page,
    totalPages,
    search,
    taller,
    institution,
    setPage,
    setSearch,
    setTaller,
    setInstitution,
  } = useMaintenanceStore();

  const {
    institutions,
    fetchInstitutions,
    allInstitutions,
    fetchAllInstitutions
  } = useInstitutionStore();

  useEffect(() => {

  //fetchInstitutions();
  fetchAllInstitutions();
  fetchAllTalleres();

  setPage(1);
  setSearch("");
  setTaller("");
  setInstitution("");

}, []);


  useEffect(() => {

    fetchMaintenances({
      aprobacion: "aceptado",
    });

  }, [page, search, taller, institution]);

  

  const handleAction = async (  action, item ) => {


    if (action === "pedido") {
    setSelectedItem(item);
    setOpenPedido(true);
    return;
  }
   

    let nuevoEstado = "";

    if (action === "accept") {
      nuevoEstado = "aceptado";
    }

    if (action === "reject") {
      nuevoEstado = "rechazado";
    }

    const result =
      await editMaintenance(
        item.id,
        {
          aprobacion: nuevoEstado,
        }
      );

    
    if (result.ok) {

      fetchMaintenances({
        aprobacion: "pendiente",
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
          listaTalleres={allTalleres}
          listaInstituciones={allInstitutions}
        />

      </div>

      <div className="overflow-x-auto rounded-xl border shadow-sm dark:bg-gray-800">

        <table className="w-full text-sm dark:border-gray-500">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:border-gray-500 dark:text-gray-300">

            <tr>

              {[
                "#",
                "N°",
                "Sección",
                "Descripción",
                "Taller",
                "Aprobación",
                "Fecha Envío",
                "Operación"
              ].map((h) => (

                <th
                  key={h}
                  className="border px-3 py-2 text-left dark:bg-gray-800 dark:border-gray-500"
                >
                  {h}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {maintenances.length > 0 ? (

              maintenances.map((item, i) => (

                <ListRow
                  key={item.id}
                  item={item}
                  index={i + 1}
                  onAction={handleAction}
                />

              ))

            ) : (

              <tr>

                <td
                  colSpan={8}
                  className="text-center py-4 text-gray-500"
                >
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
      <MaterialRequestForm
          isOpen={openPedido}
          onClose={() => setOpenPedido(false)}
          application={selectedItem}
          onSave={async (payload) => {
            const res = await addOrder(payload);
            return res;
          }}
        />

    </div>
  );
}