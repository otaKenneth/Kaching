import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    h1Style: {
        fontSize: 80, marginBottom: "20%",
        fontWeight: "bold"
    },
    h2Style: {
        fontSize: 70, marginBottom: "20%",
        fontWeight: "bold"
    },
    h3Style: {
        fontSize: 60, marginBottom: "20%",
        fontWeight: "bold"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        overflow: "hidden",
        elevation: 5
    },
    collapsibleHeader: {
      flexDirection: "row", width: "100%", 
      justifyContent: "space-between", 
      paddingHorizontal: 10, paddingVertical: 10,
      borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
});