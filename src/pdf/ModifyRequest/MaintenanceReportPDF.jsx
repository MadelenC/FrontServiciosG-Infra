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
        size="LETTER"
        style={{
          padding: 15,
          fontSize: 8,
        }}
      >

        <MaintenanceReportSection item={item} />

        <MaintenanceReportSection item={item} />

        <MaintenanceReportSection item={item} />

        <MaintenanceReportSection item={item} />

      </Page>

    </Document>

  );

}