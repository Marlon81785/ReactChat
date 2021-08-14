import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        paddingTop: 10,
      },
    container_image_textInput: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
      padding: 20,
      paddingTop: 10,
      flexDirection: 'row'
    },
    inputStyle: {
        fontSize: 40,
        marginLeft: 10
    },
    viewDoBtn: {
        top: 60
    },
    publicPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 50,
    }

});