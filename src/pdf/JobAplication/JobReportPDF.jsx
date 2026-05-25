import React from "react";

import {
  Document,
  Page,
  View,
} from "@react-pdf/renderer";

import JobReportSection
from "./JobReportSection";

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

        <JobReportSection
          item={item}
        />

        <View
          style={{
            marginVertical: 10,
            borderTop: 1,
          }}
        />

        <JobReportSection
          item={item}
        />

        <View
          style={{
            marginVertical: 10,
            borderTop: 1,
          }}
        />

        <JobReportSection
          item={item}
        />

        <View
          style={{
            marginVertical: 10,
            borderTop: 1,
          }}
        />

        <JobReportSection
          item={item}
        />

      </Page>

    </Document>

  );

}