

import React from "react";

import { Document, Page,Image,View,} from "@react-pdf/renderer";
import UsersReportHeader from"./UsersReportHeader";
import UsersReportTable from "./UsersReportTable";
import UsersReportFooter from "./UsersReportFooter";
import Logo from "../../pdf/assets/logoUATF.png";

export default function UsersReportPDF({
  users,
  title,
}) {

  return (

    <Document>

      <Page
        size="LETTER"
        style={{
          padding: 25,
          fontSize: 8,
          position: "relative",
        }}
      >
      <View
          fixed
          style={{
            position: "absolute",
            width: "90%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={Logo}
            style={{
              width: 400,
              opacity: 0.10,
            }}
          />
        </View>

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