import React from "react";

import { pdf } from "@react-pdf/renderer";

import { FaPrint } from "react-icons/fa";

import PedidoMaterialPDF
from "../../pdf/OrderReport/OrderReportPDF";

import { FaEye } from "react-icons/fa";

export default function PedidoMaterialButton({
  orders,
}) {

  const handlePrint = async () => {

    const blob = await pdf(

      <PedidoMaterialPDF
        orders={orders}
      />

    ).toBlob();

    const url = URL.createObjectURL(blob);

    window.open(url);

  };

  return (

    <button
  onClick={handlePrint}
  title="Ver"
  className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-semibold"
>
  <FaEye />
</button>

  );

}