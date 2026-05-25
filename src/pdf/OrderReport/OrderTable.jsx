import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "./styles";

export default function OrderTable({ item }) {

  return (

    <View style={styles.table}>

     

      <View style={styles.tableRow}>

        <View style={styles.cantPedido}>
          <Text>
            Cant.
            {"\n"}
            Pedido
          </Text>
        </View>

        <View style={styles.unidad}>
          <Text>
            Unid. de
            {"\n"}
            Medida
          </Text>
        </View>

        <View style={styles.descripcion}>
          <Text>
            D E S C R I P C I O N
          </Text>
        </View>

        <View style={styles.cantAprob}>
          <Text>
            Cant.
            {"\n"}
            Aprob.
          </Text>
        </View>

        <View style={styles.cantEntreg}>
          <Text>
            Cant.
            {"\n"}
            Entreg.
          </Text>
        </View>

        <View style={styles.codigoPresup}>
          <Text>
            Código
            {"\n"}
            Presup.
          </Text>
        </View>

        <View style={styles.codigoMaterial}>
          <Text>
            Código
            {"\n"}
            Materiales
          </Text>
        </View>

      </View>

   

      <View style={styles.tableRow}>

        <View style={styles.cantPedido}>
          <Text>1</Text>
        </View>

        <View style={styles.unidad}>
          <Text>pza</Text>
        </View>

        <View style={styles.descripcion}>
          <Text>{item.descripcion}</Text>
        </View>

        <View style={styles.cantAprob}>
          <Text></Text>
        </View>

        <View style={styles.cantEntreg}>
          <Text></Text>
        </View>

        <View style={styles.codigoPresup}>
          <Text></Text>
        </View>

        <View style={styles.codigoMaterial}>
          <Text></Text>
        </View>

      </View>


      {Array.from({ length: 8 }).map((_, i) => (

        <View
          key={i}
          style={styles.tableRow}
        >

          <View style={styles.cantPedido}>
            <Text></Text>
          </View>

          <View style={styles.unidad}>
            <Text></Text>
          </View>

          <View style={styles.descripcion}>
            <Text></Text>
          </View>

          <View style={styles.cantAprob}>
            <Text></Text>
          </View>

          <View style={styles.cantEntreg}>
            <Text></Text>
          </View>

          <View style={styles.codigoPresup}>
            <Text></Text>
          </View>

          <View style={styles.codigoMaterial}>
            <Text></Text>
          </View>

        </View>

      ))}

    </View>

  );

}