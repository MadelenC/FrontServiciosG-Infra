import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEdit, FaPrint, FaTrash } from "react-icons/fa";

export default function JobApplicationRow({
  application,
  index,
  onEdit,
  onDelete,
}) {

  const handlePrint = () => {
    console.log("Imprimiendo:", application);
    window.print();
  };

  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700">
        {index}
      </TableCell>

      {/* CHOFER */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {application.chofer || ""}
      </TableCell>

      {/* VEHÍCULO */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {application.vehiculo
            ? [application.vehiculo.tipog, application.vehiculo.placa].filter(Boolean).join(" - ")
            : "-"}
        </TableCell>

     {/* ACCESORIOS */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {application.accesorios?.length
          ? application.accesorios.map(a => a.solicitud).join(", ")
          : "-"}
      </TableCell>

      {/* DESCRIPCIÓN */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {application.descripcion}
      </TableCell>

      {/* FECHA */}
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {application.fecha}
      </TableCell>

      {/* OPERACIONES */}
      <TableCell className="border border-gray-200 px-3 py-2">
        <div className="flex items-center gap-2">

          {/* EDITAR */}
          <button
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
            title="Editar"
            onClick={() => onEdit(application)}
          >
            <FaEdit size={14} />
          </button>

          {/* IMPRIMIR */}
          <button
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
            title="Imprimir"
            onClick={handlePrint}
          >
            <FaPrint size={14} />
          </button>

        </div>
      </TableCell>

    </TableRow>
  );
}