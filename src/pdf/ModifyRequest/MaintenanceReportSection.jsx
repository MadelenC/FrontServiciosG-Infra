import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function MaintenanceReportSection({
  item,
}) {

  return (

    <View
      style={{
        border: 1,
        marginBottom: 8,
      }}
    >

      {/* ENCABEZADO */}

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#bfbfbf",
          borderBottom: 1,
          alignItems: "center",
          minHeight: 34,
        }}
      >

        {/* IZQUIERDA */}

        <View
          style={{
            width: "35%",
            paddingLeft: 6,
          }}
        >

          <Text
            style={{
              fontSize: 8,
              fontWeight: "bold",
            }}
          >
            U.A.T.F.
          </Text>

          <Text
            style={{
              fontSize: 7,
            }}
          >
            DEPTO. INFRAESTRUCTURA
          </Text>

        </View>

        {/* CENTRO */}

        <View
          style={{
            width: "45%",
            alignItems: "center",
          }}
        >

          <Text
            style={{
              fontSize: 9,
              fontWeight: "bold",
            }}
          >
            SOLICITUD DE
          </Text>

          <Text
            style={{
              fontSize: 9,
              fontWeight: "bold",
            }}
          >
            TRABAJO INTERNO
          </Text>

        </View>

        {/* DERECHA */}

        <View
          style={{
            width: "20%",
            borderLeft: 1,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >

          <Text
            style={{
              fontSize: 7,
            }}
          >
            SOL. S#
          </Text>

          <Text
            style={{
              fontSize: 9,
              fontWeight: "bold",
            }}
          >
            {item.id_nro}
          </Text>

        </View>

      </View>

      {/* DATOS */}

      <View
        style={{
          padding: 6,
          gap: 4,
        }}
      >

        {/* FILA 1 */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          {/* IZQUIERDA */}

          <View
            style={{
              flexDirection: "row",
              width: "70%",
            }}
          >

            <Text
              style={{
                width: 120,
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              UNIDAD SOLICITANTE:
            </Text>

            <Text
              style={{
                fontSize: 7,
              }}
            >
              {item.institucion?.nombre || "-"}
            </Text>

          </View>

          {/* DERECHA */}

          <View
            style={{
              flexDirection: "row",
              width: "30%",
              justifyContent: "flex-end",
            }}
          >

            <Text
              style={{
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              Gestión:
            </Text>

            <Text
              style={{
                fontSize: 7,
                marginLeft: 4,
              }}
            >
              2026
            </Text>

          </View>

        </View>

        {/* FILA 2 */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          {/* IZQUIERDA */}

          <View
            style={{
              flexDirection: "row",
              width: "60%",
            }}
          >

            <Text
              style={{
                width: 120,
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              SECCIÓN:
            </Text>

            <Text
              style={{
                fontSize: 7,
              }}
            >
              {item.taller || "-"}
            </Text>

          </View>

          {/* DERECHA */}

          <View
            style={{
              flexDirection: "row",
              width: "40%",
              justifyContent: "flex-end",
            }}
          >

            <Text
              style={{
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              FECHA:
            </Text>

            <Text
              style={{
                fontSize: 7,
                marginLeft: 4,
              }}
            >
              {item.fecha || "-"}
            </Text>

          </View>

        </View>

        {/* FILA 3 */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          {/* IZQUIERDA */}

          <View
            style={{
              flexDirection: "row",
              width: "60%",
            }}
          >

            <Text
              style={{
                width: 120,
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              FECHA RECEPCIÓN:
            </Text>

            <Text
              style={{
                fontSize: 7,
              }}
            >
              ____________
            </Text>

          </View>

          {/* DERECHA */}

          <View
            style={{
              flexDirection: "row",
              width: "40%",
              justifyContent: "flex-end",
            }}
          >

            <Text
              style={{
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              HORA:
            </Text>

            <Text
              style={{
                fontSize: 7,
                marginLeft: 4,
              }}
            >
              _______
            </Text>

          </View>

        </View>

      </View>

      {/* DESCRIPCIÓN */}

      <View
        style={{
          paddingHorizontal: 6,
          marginBottom: 4,
        }}
      >

        <Text
          style={{
            fontSize: 7,
            fontWeight: "bold",
            marginBottom: 3,
          }}
        >
          DESCRIPCIÓN DEL TRABAJO A REALIZAR:
        </Text>

        <View
          style={{
            border: 1,
            minHeight: 20,
            padding: 2,
          }}
         >

          <Text
            style={{
              fontSize: 7,
              lineHeight: 1.2,
            }}
          >
            {item.descripcion || "-"}
          </Text>

        </View>

      </View>

    

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 8,
          paddingBottom: 5,
          marginTop: 2,
        }}
      >

        

        <View
          style={{
            width: "30%",
            alignItems: "center",
          }}
        >

          <Text>
            ____________________
          </Text>

          <Text
            style={{
              fontSize: 6,
              textAlign: "center",
              marginTop: 1,
            }}
          >
            {item.user?.nombres}{" "}
            {item.user?.apellidos}
          </Text>

          <Text
            style={{
              fontSize: 6,
              textAlign: "center",
            }}
          >
            FIRMA RESPONSABLE
          </Text>

          <Text
            style={{
              fontSize: 6,
              textAlign: "center",
            }}
          >
            (DECANO, DIRECTOR, JEFE)
          </Text>

        </View>

        

        <View
          style={{
            width: "30%",
            alignItems: "center",
          }}
        >

          <Text>
            ____________________
          </Text>

          <Text
            style={{
              fontSize: 6,
              textAlign: "center",
              marginTop: 1,
            }}
          >
            Vo.Bo.
          </Text>

          <Text
            style={{
              fontSize: 6,
              textAlign: "center",
            }}
          >
            JEFATURA DE
          </Text>

          <Text
            style={{
              fontSize: 6,
              textAlign: "center",
            }}
          >
            INFRAESTRUCTURA
          </Text>

        </View>

    

        <View
          style={{
            width: "30%",
            alignItems: "center",
          }}
        >

          <Text>
            ____________________
          </Text>

          <Text
            style={{
              fontSize: 6,
              textAlign: "center",
              marginTop: 1,
            }}
          >
            (AUTORIZACIÓN)
          </Text>

        </View>

      </View>

    </View>

  );

}