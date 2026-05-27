import React from "react";
import { pdf } from "@react-pdf/renderer";
import { FiPrinter } from "react-icons/fi";

import { useUserStore } from "../../zustand/userStore";

export default function UsersReportButton({ tipo, title }) {

const { fetchUsersReport } = useUserStore();

 const handleDownload = async () => {

  try {

    // TRAER TODOS LOS USUARIOS
    const users = await fetchUsersReport(tipo);

    // IMPORTAR PDF
    const { default: UsersReportPDF } = await import(
      "../../Pdf/UsersReport/UsersReportPDF"
    );

    // GENERAR PDF
    const blob = await pdf(
      <UsersReportPDF
        users={users}
        title={title}
      />
    ).toBlob();

    // DESCARGAR
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      tipo === ""
        ? "reporte-usuarios.pdf"
        : `reporte-${tipo}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  } catch (error) {

    console.log(error);

  }

};

  return (
    <button
      onClick={handleDownload}
      className="
        w-full text-left
        px-4 py-2
        hover:bg-gray-100
        dark:hover:bg-gray-700
        text-sm
      "
    >
      <div className="flex items-center gap-2">
        <FiPrinter  /> 
        {title}
      </div>
    </button>
  );
}