import { RELATIONSHIPS } from 'expo-contacts';
import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

const btnContatosImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default class ChatApp extends Component{
    state = {
        count: null,//contador de numero de mensagens
        messageInputTemp: null, //usuario digitar ficara aqui temporariamente
        contacts: [
            {
                'id': '0',
                'nameContact': 'Fulano de Tal',
                'imageContact': 'imageee data'
            },
            {
                'id': '1',
                'type': 'received',
                'name': 'mensagem 1 da conversa'
            },
            {
                'id': '2',
                'type': 'send',
                'name': 'mensagem 2 etc'
            },
            {
                'id': '3',
                'name': 'boris jhonson'
            },
            {
                'id': '4',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '5',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '6',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '7',
                'type': 'received',
                'name': 'boris jhonson'
            },
            {
                'id': '8',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '9',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '10',
                'type': 'received',
                'name': 'boris jhonson'
            },
            {
                'id': '11',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '12',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '13',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '14',
                'type': 'send',
                'name': 'boris jhonson'
            },
            {
                'id': '15',
                'type': 'send',
                'name': 'boris jhonson'
            },
            
        ]
    }

    constructor(props) {
      super(props);
      
    }

    onLayout() {      //tenta descer o scroll para o final
        this.list.scrollToEnd({animated: true})
    
        
    }

    getMessageFromTextInputUser(){
        if(this.state.messageInputTemp === null){
            return 0
        }else
            {
                var cont = this.state.contacts.length+1
                var newMsg = {
                    'id': cont.toString(),
                    'type': 'send',
                    'name': this.state.messageInputTemp 
                }
        
        
        
                this.setState({
                    contacts: this.state.contacts.concat(newMsg)
                    
                })

                this.onLayout()
                this.setState({messageInputTemp: null})


            }
        

        


    }
    
    
    
    
    render(){
        
        console.log(this.state.contacts)
      return(
            <View style={styles.masterView}>
              <View style={styles.contato}>
                <Image
                    style={styles.foto}
                    source={{uri: btnContatosImage}}
                >
                </Image>
                <Text style={styles.contatoNome}>Fulano de Tal</Text>
              </View>

                <SafeAreaView onLayout={() => this.onLayout()} style={styles.container}>
                

                    <FlatList
                        ref={el => this.list = el}
                        data={this.state.contacts}
                        renderItem={({item})=> {
                        
                            
                            if(item.type === 'send'){
                                return (
                                    <View style={styles.contact}>
                                        <TouchableOpacity style={styles.contact}>
                                            <View style={{flex: .4}}>
                                                
                                            </View>
                                            <View style={styles.messageSend}>
                                                <Text style={styles.textmessageSend}>{item.name}</Text>
                                            </View>
                                            
                                        </TouchableOpacity>
                                    </View>
                                )
                            }else{
                                if(item.type === 'received'){
                                    return (
                                        <View style={styles.contact}>
                                            <TouchableOpacity style={styles.contact}>
                                                <View style={styles.messageSend}>
                                                    <Text style={styles.textmessageSend}>{item.name}</Text>
                                                </View>
                                                <View style={{flex: .4}}>
                                                    
                                                </View>
                                                
                                                
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            }
                        }
                        }
                        />

                </SafeAreaView>
                <View style={styles.inputView}>
                    <TextInput
                    value={this.state.messageInputTemp}
                    onChangeText={(text)=>this.setState({messageInputTemp: text})}
                    multiline
                    style={styles.inputMessage} placeholder="  type message"></TextInput>
                    <TouchableOpacity style={styles.btnSendMessage} title=">">
                        <Button onPress={()=>this.getMessageFromTextInputUser()} title="->"></Button>
                    </TouchableOpacity>
                </View>

            </View>
        
        
      );
    }
  
}


const styles = StyleSheet.create({
  masterView: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,//este codigo esta duplicando o 'marginTop' para o safeareavie
    
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