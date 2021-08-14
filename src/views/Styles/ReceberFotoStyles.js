import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 10,
        
    },
    TouchableOpacityPhoto: {
        alignItems: "center",
        marginBottom: 5

    },
    container_image_textInput: {
      flex: .8,
      alignItems: "center",
      justifyContent: 'center',
      flexDirection: 'row',
    },
    inputStyle: {
        fontSize: 25,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        marginBottom: 30
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