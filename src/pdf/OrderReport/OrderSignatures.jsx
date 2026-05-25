import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "./styles";

export default function OrderSignatures({ item }) {

  return (

    <View style={styles.signatureContainer}>

      {/* SUPERIOR RESPONSABLE */}
      <View style={styles.signatureBox}>

        <View style={styles.signatureHeader}>
          <Text style={styles.signatureTitle}>
            SUPERIOR RESPONSABLE
          </Text>
        </View>

        <View style={styles.signatureContent}>

          <Text>
            Ing. Roger Barahona
          </Text>

          <Text>
            Telchi
          </Text>

          <Text>
            JEFE DE DIVF N°ser
          </Text>

          <Text>
            {item.id}
          </Text>

        </View>

        <View style={styles.fechaBox}>
          <Text>FECHA:</Text>
        </View>

      </View>

      {/* APROBADO */}
      <View style={styles.signatureBox}>

        <View style={styles.signatureHeader}>
          <Text style={styles.signatureTitle}>
            Aprobado Director
          </Text>

          <Text style={styles.signatureTitle}>
            Administrativo y Financiero
          </Text>
        </View>

        <View style={styles.signatureContent}>

          <Text>
            Lic. Elias Funes
          </Text>

          <Text>
            Calderon
          </Text>

        </View>

        <View style={styles.fechaBox}>
          <Text>FECHA:</Text>
        </View>

      </View>

      {/* ENTREGADO */}
      <View style={styles.signatureBox}>

        <View style={styles.signatureHeader}>
          <Text style={styles.signatureTitle}>
            ENTREGADO POR
          </Text>
        </View>

        <View style={styles.signatureContent}>
        </View>

        <View style={styles.fechaBox}>
          <Text>FECHA:</Text>
        </View>

      </View>
 <View style={styles.signatureBoxLast}>

        <View style={styles.signatureHeader}>
          <Text style={styles.signatureTitle}>
            RECIBIDO POR
          </Text>
        </View>

        <View style={styles.signatureContent}>

          <Text>
            Lic. Elias Funes
          </Text>

          <Text>
            Calderon
          </Text>

          <Text>
            ENCARGADO
          </Text>

        </View>

        <View style={styles.fechaBox}>
          <Text>FECHA:</Text>
        </View>

      </View>

    </View>

  );

}