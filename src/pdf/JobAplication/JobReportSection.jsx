import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function JobReportSection({
  item,
}) {

  return (

    <View style={{ border: 1,  marginBottom: 8, }} >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#bfbfbf",
          borderBottom: 1,
          alignItems: "center",
          minHeight: 34,
        }}
      >
        <View  style={{ width: "35%",  paddingLeft: 6,  }}  >
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
            DEPTO. DE INFRAESTRUCTURA
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
            Sol.S #
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

      {/* SISTEMA */}

      <View
        style={{
          alignItems: "center",
          marginTop: 3,
        }}
      >

        <Text
          style={{
            fontSize: 6,
          }}
        >
          Sistema Web Departamento de Infraestructura U.A.T.F. Gestión 2026
        </Text>

      </View>

    

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
          }}
        >

          <View
            style={{
              flexDirection: "row",
              width: "65%",
            }}
          >

            <Text
              style={{
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              UNIDAD SOLICITANTE:
            </Text>

            <Text
              style={{
                fontSize: 7,
                marginLeft: 3,
              }}
            >
              {item.institucion?.nombre || "-"}
            </Text>

          </View>

          <View
            style={{
              flexDirection: "row",
              width: "35%",
              justifyContent: "flex-end",
            }}
          >

            <Text
              style={{
                fontSize: 7,
                fontWeight: "bold",
              }}
            >
              Fecha:
            </Text>

            <Text
              style={{
                fontSize: 7,
                marginLeft: 3,
              }}
            >
              {item.fecha || "-"}
            </Text>

          </View>

        </View>

  
       <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  }}
>

  {/* SECCION */}

  <View
    style={{
      flexDirection: "row",
      width: "40%",
    }}
  >

    <Text
      style={{
        fontSize: 7,
        fontWeight: "bold",
      }}
    >
      SECCION:
    </Text>

    <Text
      style={{
        fontSize: 7,
        marginLeft: 3,
      }}
    >
      {item.taller || "-"}
    </Text>

  </View>

  {/* FECHA RECEPCION */}

<View
  style={{
    flexDirection: "row",
    width: "32%",
    justifyContent: "center",
  }}
>

  <Text
    style={{
      fontSize: 7,
      fontWeight: "bold",
    }}
  >
    FECHA DE RECEPCION:
  </Text>

</View>



<View
  style={{
    flexDirection: "row",
    width: "18%",
    justifyContent: "flex-end",
    paddingRight: 6,
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

</View>

</View>

       

        <View
          style={{
            border: 1,
            padding: 4,
            gap: 3,
          }}
        >

         

<View
  style={{
    border: 1,
    padding: 4,
  }}
>

  <View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>

    <Text
      style={{
        fontSize: 7,
        fontWeight: "bold",
      }}
    >
      EQUIPO:
    </Text>

    <Text
      style={{
        fontSize: 7,
        marginLeft: 2,
        marginRight: 8,
      }}
    >
      {item.equipo || ""}
    </Text>

    <Text
      style={{
        fontSize: 7,
        fontWeight: "bold",
      }}
    >
      MARCA:
    </Text>

    <Text
      style={{
        fontSize: 7,
        marginLeft: 2,
        marginRight: 8,
      }}
    >
      {item.marca || ""}
    </Text>

    <Text
      style={{
        fontSize: 7,
        fontWeight: "bold",
      }}
    >
      MODELO:
    </Text>

    <Text
      style={{
        fontSize: 7,
        marginLeft: 2,
        marginRight: 8,
      }}
    >
      {item.modelo || ""}
    </Text>

    <Text
      style={{
        fontSize: 7,
        fontWeight: "bold",
      }}
    >
      No.:
    </Text>

    <Text
      style={{
        fontSize: 7,
        marginLeft: 2,
        marginRight: 8,
      }}
    >
      {item.numero || ""}
    </Text>

    <Text
      style={{
        fontSize: 7,
        fontWeight: "bold",
      }}
    >
      CÓDIGO:
    </Text>

    <Text
      style={{
        fontSize: 7,
        marginLeft: 2,
        marginRight: 8,
      }}
    >
      {item.codigo || ""}
    </Text>

    <Text
      style={{
        fontSize: 7,
        fontWeight: "bold",
      }}
    >
      OTROS:
    </Text>

    <Text
      style={{
        fontSize: 7,
        marginLeft: 2,
      }}
    >
      {item.otros || ""}
    </Text>

  </View>

</View>

        </View>

      </View>

      {/* DESCRIPCION */}

      <View
        style={{
          paddingHorizontal: 6,
          marginBottom: 5,
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
            minHeight: 25,
            padding: 5,
          }}
        >

          <Text
            style={{
              fontSize: 7,
            }}
          >
            {item.descripcion || "-"}
          </Text>

        </View>

      </View>

      {/* FIRMAS */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 8,
          paddingBottom: 6,
          marginTop: 4,
        }}
      >

        {/* FIRMA RESPONSABLE */}

        <View
          style={{
            width: "40%",
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
              marginTop: 2,
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

        {/* FIRMA INFRA */}

        <View
          style={{
            width: "40%",
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
              marginTop: 2,
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
            JEFATURA DE INFRAESTRUCTURA
          </Text>

        </View>

      </View>

    </View>

  );

}