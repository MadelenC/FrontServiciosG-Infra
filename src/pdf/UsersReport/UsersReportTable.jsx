import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function UsersReportTable({
  users,
}) {

  return (

    <View
      style={{
        border: 1,
      }}
    >
      
      

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ddd",
          borderBottom: 1,
        }}
      >

        <Text style={styles.nro}>
          Nro.
        </Text>

        <Text style={styles.nombre}>
          NOMBRES Y APELLIDOS
        </Text>

        <Text style={styles.celular}>
          CELULAR
        </Text>

        <Text style={styles.email}>
          EMAIL
        </Text>

        <Text style={styles.cargo}>
          CARGO
        </Text>

      </View>

      {/* FILAS */}

      {
        users?.map((u, index) => (

          <View
            key={u.id}
            style={{
              flexDirection: "row",
              borderBottom: 1,
            }}
          >

            <Text style={styles.nro}>
              {index + 1}
            </Text>

            <Text style={styles.nombre}>
              {u.nombres} {u.apellidos}
            </Text>

            <Text style={styles.celular}>
              {u.celular || "-"}
            </Text>

            <Text style={styles.email}>
              {u.email || "-"}
            </Text>

            <Text style={styles.cargo}>
              {u.tipo || "-"}
            </Text>

          </View>

        ))
      }

    </View>

  );

}

const styles = {

  nro: {
    width: "8%",
    borderRight: 1,
    padding: 4,
  },

  nombre: {
    width: "37%",
    borderRight: 1,
    padding: 4,
  },

  celular: {
    width: "15%",
    borderRight: 1,
    padding: 4,
  },

  email: {
    width: "30%",
    borderRight: 1,
    padding: 4,
  },

  cargo: {
    width: "10%",
    padding: 4,
  },

};