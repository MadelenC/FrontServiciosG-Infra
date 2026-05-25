
import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function UsersReportFooter() {

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
        marginTop: 30,
      }}
    >

      {/* FECHA */}

      <View
        style={{
          alignItems: "flex-end",
          marginBottom: 40,
        }}
      >

        <Text
          style={{
            fontSize: 9,
          }}
        >
          {fecha}
        </Text>

      </View>

      {/* FIRMAS */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 40,
        }}
      >

        {/* FIRMA 1 */}

        <View
          style={{
            alignItems: "center",
            width: "40%",
          }}
        >

          <Text>
            ________________________
          </Text>

          <Text
            style={{
              marginTop: 5,
              fontSize: 9,
            }}
          >
            FIRMA RESPONSABLE
          </Text>

        </View>

        {/* FIRMA 2 */}

        <View
          style={{
            alignItems: "center",
            width: "40%",
          }}
        >

          <Text>
            ________________________
          </Text>

          <Text
            style={{
              marginTop: 5,
              fontSize: 9,
            }}
          >
            Vo.Bo.
          </Text>

        </View>

      </View>

      {/* SISTEMA */}

      <View
        style={{
          marginTop: 40,
          alignItems: "center",
        }}
      >

        <Text
          style={{
            fontSize: 7,
            color: "gray",
          }}
        >
          Sistema Web Departamento de Infraestructura U.A.T.F.
        </Text>

      </View>

    </View>

  );

}