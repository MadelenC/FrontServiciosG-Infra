import React from "react";

import {
  Document,
  Page,
  View,
} from "@react-pdf/renderer";

import MaintenanceReportSection
from "./MaintenanceReportSection";

export default function MaintenanceReportPDF({
  item,
}) {

  return (

    <Document>

      <Page
        size="A4"
        style={{
          padding: 20,
          fontSize: 9,
        }}
      >

        <MaintenanceReportSection item={item} />

        <View
          style={{
            marginVertical: 15,
            borderTop: 1,
          }}
        />

        <MaintenanceReportSection item={item} />

        <View
          style={{
            marginVertical: 15,
            borderTop: 1,
          }}
        />

        <MaintenanceReportSection item={item} />

         <View
          style={{
            marginVertical: 15,
            borderTop: 1,
          }}
        />

        <MaintenanceReportSection item={item} />

      </Page>

    </Document>

  );

}