import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit, FaPrint } from "react-icons/fa";

export default function DepartureAuthorizationRow({
  departure,
  index,
  onEdit,
}) {

  const badgeColor =
    departure.estado === "Aprobado"
      ? "success"
      : departure.estado === "Pendiente"
      ? "warning"
      : departure.estado === "Rechazado"
      ? "danger"
      : "info";

  const handlePrint = () => {
    console.log("Imprimiendo:", departure);
    window.print();
  };

  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700">
        {index}
      </TableCell>

      {/* Chofer */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {departure.chofer?.nombre || departure.chofer}
      </TableCell>

      {/* Movilidad */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {departure.vehiculo?.placa || departure.vehiculo}
      </TableCell>

      {/* Responsable */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {departure.responsable}
      </TableCell>  
      {/* Operaciones */}
      <TableCell className="border border-gray-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
            title="Editar "
            onClick={() => onEdit(budget)}
          >
            <FaEdit size={14} />
          </button>

          <button
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
            title="Imprimir "
            onClick={handlePrint}
          >
            <FaPrint size={14} />
          </button>
        </div>
      </TableCell>

    </TableRow>
  );
}