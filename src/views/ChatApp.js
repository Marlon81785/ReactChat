import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles/ChatAppStyles';

const btnContatosImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default class ChatApp extends Component{

    constructor({route, navigation}) {
      super();
      const { phone, name } = route.params;
      this.state = {
        navigation: navigation,
        count: null,//contador de numero de mensagens
        messageInputTemp: null, //usuario digitar ficara aqui temporariamente
        contato: {
            'phoneNumber': phone,
            'nameContact': name,
            'imageContact': 'imageee data',

        },
        contacts: [
            
            {
                'id': '0',
                'type': 'received',
                'name': 'Bão ?',
                'statusEnvio': 'enviada',
                'statusDestino': 'recebido',
            },
            
            /*exempple the structure
            {
                'id': '2',
                'type': 'send',
                'name': 'mensagem 2 etc',
                'statusEnvio': 'enviada',
                'statusDestino': 'not',
            },

            */
            
            
        ]
    }

    this.getConversation(this.state.contato.phoneNumber)
      
    }

    onLayout() {      //tenta descer o scroll para o final
        this.list.scrollToEnd({animated: true})
    
        
    }

    StoreConversation = async (value, key) => { //value is phone number, key its conversation
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem("@".concat(key), jsonValue)
        } catch (e) {
          // saving error
          console.log("erro ao salvar")
        }
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
                    'name': this.state.messageInputTemp,
                    'statusEnvio': 'enviada',
                    'statusDestino': 'recebido',
                }
        
        
        
                this.setState({
                    contacts: this.state.contacts.concat(newMsg)

                })

                this.onLayout()
                this.setState({messageInputTemp: null})

                



            }

    }

    //verify if existics data from phone number valid in use
    //key from phone number is : '@phoneSaveTeste4
    getConversation = async (key) => {

        try {
            const jsonValue = await AsyncStorage.getItem("@".concat(key))

            if(jsonValue != null){
                console.log("conversa encontrada para o numero: ")
                console.log(this.state.contato.phoneNumber)//exemplo de como acessar
                
                console.log(JSON.parse(jsonValue))
                this.setState({contacts: JSON.parse(jsonValue)})
                
            }
       
        } catch(e) {
            // error reading value
            console.log('not saved conversation for phone number')
        }
    }

    clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
      }
    
    
    
    
    render(){
        console.log(this.state.contacts)
        setTimeout(()=>{
            this.onLayout()
            this.StoreConversation(this.state.contacts, this.state.contato.phoneNumber)
        },1000)

        

      return(
            <View style={styles.masterView}>
              <View style={styles.contato}>
                <Image
                    style={styles.foto}
                    source={{uri: btnContatosImage}}
                >
                </Image>
                <Text style={styles.contatoNome}>{this.state.contato.nameContact}</Text>
                <Text>   {this.state.contato.phoneNumber}</Text>
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


