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
      borderRadius: 5
      
    },
    contact: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 2,
      borderRadius: 6
    },
    foto: {
      width: 60,
      height: 60,
      borderRadius: 50,
    },
    contato: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginBottom: 2,
        
      },
    contatoNome: {
        marginLeft: 15,
        fontSize: 30
    },
    btnSendMessage: {
        flex: .5,
        position: 'relative',
        right: 0,
        width: 80,
        borderRadius: 60,
        
    },
    inputMessage: {
      flex: 1,  
      position: 'relative',
      fontSize: 20
  
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
        alignItems: 'center'
    }
    
      
  
      
    
    
  
});