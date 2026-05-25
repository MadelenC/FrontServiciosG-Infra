import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";

export default function OrderInfo({ item }) {

  return (
    <View style={styles.infoBox}>

      <View style={styles.infoRow}>
        <Text>
          <Text style={styles.bold}>
            Unidad Solicitante:
          </Text>{" "}
          {item.ins_id}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text>
          <Text style={styles.bold}>
            Para emplearse en:
          </Text>{" "}
          {item.taller}
        </Text>
      </View>

    </View>
  );
}