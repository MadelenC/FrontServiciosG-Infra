import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function UsersReportHeader({
  title,
}) {

  const fecha =
    new Date().toLocaleDateString(
      "es-BO",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  return (

    <View
      style={{
        marginBottom: 20,
      }}
    >

      

      <View
        style={{
          borderTop: 1,
          borderColor: "#d1d5db",
          paddingTop: 10,
        }}
      >

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >

        

          <View>

            <Text
              style={{
                fontSize: 7,
                color: "#6b7280",
                marginBottom: 2,
              }}
            >
              Reporte de:
            </Text>

            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>

          </View>

     

          <View
            style={{
              alignItems: "flex-end",
            }}
          >

            <Text
              style={{
                fontSize: 18,
                color: "#60a5fa",
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              U.A.T.F
            </Text>

            <Text
              style={{
                fontSize: 7,
                color: "#6b7280",
              }}
            >
              Fecha de emisión: {fecha}
            </Text>

          </View>

        </View>

      </View>

    </View>

  );

}