import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({


  page: {
    padding: 20,
    fontSize: 7,
    fontFamily: "Helvetica",
  },

  bold: {
    fontWeight: "bold",
  },

  title: {
    fontSize: 10,
    fontWeight: "bold",
  },



  header: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#000",
    height: 70,
  },

  headerLeft: {
    width: "22%",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 4,
    justifyContent: "center",
  },

  headerCenter: {
    width: "53%",
    borderRightWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  headerRight: {
    width: "25%",
    padding: 4,
    justifyContent: "center",
  },

 

  infoBox: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 4,
  },

  infoRow: {
    marginBottom: 3,
  },


  table: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
  },

  tableRow: {
    flexDirection: "row",
  },


  cantPedido: {
    width: "8%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 32,
    padding: 3,
    fontSize: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  unidad: {
    width: "10%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 32,
    padding: 3,
    fontSize: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  descripcion: {
    width: "36%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 32,
    padding: 3,
    fontSize: 6,
    justifyContent: "center",
  },

  cantAprob: {
    width: "8%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 32,
    padding: 3,
    fontSize: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  cantEntreg: {
    width: "8%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 32,
    padding: 3,
    fontSize: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  codigoPresup: {
    width: "15%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 32,
    padding: 3,
    fontSize: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  codigoMaterial: {
    width: "15%",
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 32,
    padding: 3,
    fontSize: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },


  signatureContainer: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#000",
    minHeight: 120,
  },

  signatureBox: {
    width: "25%",
    borderRightWidth: 1,
    borderColor: "#000",
  },

  signatureBoxLast: {
    width: "25%",
  },

  signatureHeader: {
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },

  signatureTitle: {
    fontSize: 6,
    fontWeight: "bold",
    textAlign: "center",
  },

  signatureContent: {
    minHeight: 70,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    fontSize: 6,
    textAlign: "center",
  },

  fechaBox: {
    minHeight: 18,
    paddingHorizontal: 3,
    paddingTop: 2,
    justifyContent: "center",
    fontSize: 6,
  },

});