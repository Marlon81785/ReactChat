import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    masterView: {
      flex: 1,
      
    },    
    container: {
      flex: 1,
      marginTop: 3,
      borderRadius: 5,
      margin: 5
      
    },
    inputView: {
      flexDirection: 'row',
      backgroundColor: 'gray',
      margin: 5,
      borderRadius: 5,
      
    },
    contact: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 2,
      borderRadius: 6
    },
    foto: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    header: {
      //header chat
      //backgroundColor: 'pink',
      
      
    },
    contato: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: "flex-start",
        
        
      },
    contatoNome: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginLeft: 15,
        fontSize: 20
    },
    btnSendMessage: {
        flex: .5,
        right: 0,
        width: 80,
        height: 40,
        borderRadius: 60,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
        
        
    },
    inputMessage: {
      flex: 1,  
      position: 'relative',
      fontSize: 20,
      
      
  
    },
    messageSend: {
        flex: .8,
        backgroundColor: 'green',
        right: 0,
        borderRadius: 10,
        padding: 10,
        
        
    },
    textmessageSend: {
        flex: 1,
        fontSize: 18,
        alignItems: 'center',
        color: 'white'
    }
    
      
  
      
    
    
  
});