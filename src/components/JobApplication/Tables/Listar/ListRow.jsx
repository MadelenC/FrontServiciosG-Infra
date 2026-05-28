import React from "react";
import { TableRow, TableCell } from "../../../ui/table";
import { FaEye, FaEdit, FaPrint } from "react-icons/fa";
import JobReportButton from "../../../pdf-buttons/JobReportButton";
import ProtectedView from "../../../Protected/ProtectedView";

export default function ListRow({ item, index, onAction }) {
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition dark:text-gray-400">  

    
      <TableCell className="border px-3 py-2">
        {index}
      </TableCell>

  
      <TableCell className="border px-3 py-2">
        {item.institucion?.nombre || "-"}
      </TableCell>


      <TableCell className="border px-3 py-2">
        {item.descripcion || "-"}
      </TableCell>

     
      <TableCell className="border px-3 py-2">
        {item.taller || "-"}
      </TableCell>

      <ProtectedView  rolesAllowed={["mesajeroserv","electricista","sergeneral","mecanico","mgeneral","encargadoserv","mantenimiento","administradorserv"]}>
      <TableCell className="border px-3 py-2 flex gap-2 justify-center">
            <JobReportButton item={item} />
      </TableCell>
      </ProtectedView>
    
        <ProtectedView  rolesAllowed={["encargadoserv","administradorserv"]}>
      <TableCell className="flex items-center justify-center gap-2">
      
              <button
                onClick={() => onAction?.("accept", item)}
                className="px-3 py-1 rounded-md bg-blue-10 text-blue-700 hover:bg-blue-200 text-xs font-semibold"
              >
                Aceptado
              </button>
      
              <button
                onClick={() => onAction?.("reject", item)}
                className="px-3 py-1 rounded-md bg-red-10 text-red-700 hover:bg-red-200 text-xs font-semibold"
              >
               Rechazado
              </button>
      
            </TableCell>
            </ProtectedView>
    </TableRow>
  );
}