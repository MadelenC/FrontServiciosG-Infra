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
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-300">
        {index}
      </TableCell>

      {/* CHOFER */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {application.chofer || ""}
      </TableCell>

      {/* VEHÍCULO */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {application.vehiculo
          ? [application.vehiculo.tipog, application.vehiculo.placa]
              .filter(Boolean)
              .join(" - ")
          : "-"}
      </TableCell>

      {/* ACCESORIOS */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {application.accesorios?.length
          ? application.accesorios.map(a => a.solicitud).join(", ")
          : "-"}
      </TableCell>

      {/* DESCRIPCIÓN */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {application.descripcion}
      </TableCell>

      {/* FECHA */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {application.fecha}
      </TableCell>

      {/* OPERACIONES */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
        <div className="flex items-center gap-2">

          {/* EDITAR */}
          <button
            className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            title="Editar"
            onClick={() => onEdit(application)}
          >
            <FaEdit size={14} />
          </button>

          {/* IMPRIMIR */}
          <button
            className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition"
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