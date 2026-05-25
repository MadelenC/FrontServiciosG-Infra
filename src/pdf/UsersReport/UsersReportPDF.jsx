

import React from "react";

import {
  Document,
  Page,
} from "@react-pdf/renderer";

import UsersReportHeader
from "./UsersReportHeader";

import UsersReportTable
from "./UsersReportTable";

import UsersReportFooter
from "./UsersReportFooter";

export default function UsersReportPDF({
  users,
  title,
}) {

  return (

    <Document>

      <Page
        size="A4"
        style={{
          padding: 25,
          fontSize: 8,
        }}
      >

        <UsersReportHeader
          title={title}
        />

        <UsersReportTable
          users={users}
        />

        <UsersReportFooter />

      </Page>

    </Document>

  );

}