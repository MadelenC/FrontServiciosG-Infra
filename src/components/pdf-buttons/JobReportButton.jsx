import React from "react";

import { pdf }
from "@react-pdf/renderer";

import { FaPrint }
from "react-icons/fa";

export default function JobReportButton({
  item,
}) {

  const handlePrint = async () => {

    try {


      const {
        default: JobReportPDF
      } = await import(
        "../../pdf/JobAplication/JobReportPDF"
      );

      const blob = await pdf(

        <JobReportPDF
          item={item}
        />

      ).toBlob();


      const url =
        URL.createObjectURL(blob);

      window.open(url);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <button
      onClick={handlePrint}
      className="
        p-2
        bg-orange-100
        text-orange-600
        rounded-full
        hover:bg-orange-200
      "
    >

      <FaPrint size={14} />

    </button>

  );

}