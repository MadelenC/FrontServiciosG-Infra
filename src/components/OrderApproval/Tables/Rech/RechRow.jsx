import React from "react";
import { TableRow, TableCell } from "../../../ui/table";
import PedidoMaterialButton from "../../../pdf-buttons/OrderReportButton";
import ProtectedView from "../../../Protected/ProtectedView";

export default function RechRow({
  item,
  index,
  onAction,
}) {
  return (
    <TableRow className="border hover:bg-gray-50 dark:text-gray-400 ">

      <TableCell className="border px-3 py-2">
        {index}
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.id || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.ins_id || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.descripcion || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2">
        {item.taller || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2">
        <span className="px-2 py-1 rounded text-xs font-semibold bg-red-40 text-red-500">
          {item.aprobacion || "-"}
        </span>
      </TableCell>
      <ProtectedView  rolesAllowed={["encargadoserv","administradorserv","mesajeroserv"]}>
      <TableCell className="flex items-center justify-center gap-2">
        <PedidoMaterialButton orders={[item]} />
         <button
          onClick={() => onAction?.("accept", item)}
          className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 text-xs font-semibold"
        >
          Aceptar
        </button>
      </TableCell>
      </ProtectedView>
    </TableRow>
  );
}