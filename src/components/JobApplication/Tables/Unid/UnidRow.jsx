import React from "react";
import { TableRow, TableCell } from "../../../ui/table";
import { FaEye, FaEdit, FaPrint } from "react-icons/fa";
import JobReportButton from "../../../pdf-buttons/JobReportButton";
import ProtectedView from "../../../Protected/ProtectedView";

export default function UnidRow({ item, index, onAction }) {
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

      <TableCell className="border px-3 py-2">
        {item.aprobacion || "-"}
      </TableCell>

      <ProtectedView  rolesAllowed={["mesajeroserv","electricista","sergeneral","mecanico","mgeneral","encargadoserv","mantenimiento","administradorserv"]}>
      <TableCell className="border px-3 py-2 flex gap-2 justify-center">
            <JobReportButton item={item} />
      </TableCell>
      </ProtectedView>
    
     
    </TableRow>
  );
}