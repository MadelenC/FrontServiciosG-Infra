import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEye, FaEdit, FaPrint } from "react-icons/fa";
import  MaintenanceReportButton from "../../pdf-buttons/ModifyRequestButton"
import ProtectedView from "../../Protected/ProtectedView";


export default function ModifyRow({ item, index, onAction }) {
  //console.log(item);
  return (
    <TableRow className="border border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition dark:text-gray-400">

     
      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {index}
      </TableCell>

    
      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.id_nro || "-"}
      </TableCell>

       <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.institucion?.nombre }
      </TableCell>

      
      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.descripcion || "-"}
      </TableCell>

     
      <TableCell className="border px-3 py-2 dark:border-gray-500">
        {item.taller || "-"}
      </TableCell>

    
      <ProtectedView  rolesAllowed={["encargadoserv","administradorserv","mensajeroserv"]}>
      <TableCell className="border px-3 py-2 flex gap-2 justify-center dark:border-gray-500">

        <button
          onClick={() => onAction?.("edit", item)}
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 "
          title="editar"
        >
          <FaEdit size={14} />
        </button>

        <MaintenanceReportButton item={item} />

      </TableCell>
      </ProtectedView>
      
    </TableRow>
  );
}