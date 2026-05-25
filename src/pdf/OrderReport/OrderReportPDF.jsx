import React from "react";
import { Document, Page, View } from "@react-pdf/renderer";

import OrderHeader from "./OrderHeader";
import OrderInfo from "./OrderInfo";
import OrderTable from "./OrderTable";
import OrderSignatures from "./OrderSignatures";

import { styles } from "./styles";

export default function OrderReportPDF({ orders }) {

  return (
    <Document>

      {orders.map((item, index) => (

        <Page
          key={index}
          size="A4"
          style={styles.page}
        >

          <OrderHeader item={item} />

          <OrderInfo item={item} />

          <OrderTable item={item} />

          <OrderSignatures item={item} />

        </Page>

      ))}

    </Document>
  );
}