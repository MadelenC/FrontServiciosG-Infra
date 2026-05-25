import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";

export default function OrderHeader({ item }) {

  return (
    <View style={styles.header}>

      {/* IZQUIERDA */}
      <View style={styles.headerLeft}>
        <Text>UNIVERSIDAD</Text>
        <Text>AUTONOMA</Text>
        <Text>"TOMAS FRIAS"</Text>
        <Text>DIVISION DE</Text>
        <Text>CONTABILIDAD</Text>
      </View>

      {/* CENTRO */}
      <View style={styles.headerCenter}>
        <Text style={styles.title}>
          PEDIDO DE MATERIALES N°
        </Text>
      </View>

      {/* DERECHA */}
      <View style={styles.headerRight}>
        <Text>SECCION</Text>
        <Text>ALMACENES</Text>
        <Text>GESTIÓN 2026</Text>

        <Text style={{ marginTop: 8 }}>
          No. {item.id}
        </Text>
      </View>

    </View>
  );
}