import React, { Component } from 'react';
import {TouchableOpacity, Text, View, Button, FlatList, SafeAreaView, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles/ChatAppStyles';

const btnContatosImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default class ChatApp extends Component{

    constructor({route, navigation}) {
      super();
      const { phone, name, value } = route.params;
      this.state = {
        value: value,
        conectado: null,
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
                'type': 'received',//defina o lado esquerdo ou direito no front end
                'name': 'Bão ?',           //name is message
                'statusEnvio': 'enviada',
                'statusDestino': 'recebido',// - - - - - - - - - - -- -  - - -  - - --
                'dateTime': null
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
    this.testarConexao()
	//this.clearAll()
    }

    findMessage() {
        var url2 = "http://192.168.0.103/my-api/find.php";

        fetch(url2,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        },

          body: JSON.stringify({

            'myPhoneNumber': this.state.value

          })

        })
                
        .then((response) => response.json())
        .then((res) => {
        
          //alert(res.message);
          //console.log("\n\n----------------- MENSAGENS -----------------\n" +
          //res.message +"\n --------------END MENSAGENS --------------\n")
          if(res.message == '0'){
              return 0
          }else{
            res.message.forEach(element => {

                console.log("\n\n\n+elements\n-> "+element.phoneSend + element.mensagem+"\n")
  
                // removendo a mascara deixando o numero limpo
                var r = this.state.contato.phoneNumber.replace('-','')
                    r = r.replace('(', '');
                    r = r.replace(')', '');
                    r = r.replace(' ', '');
                
                if(element.phoneSend === r){
  
                  var date = new Date()
                  var cont = this.state.contacts.length+1
                  var newMsg = {
                      'id': cont.toString(),
                      'phone': this.state.contato.phoneNumber,
                      'type': 'received',//define o lado da mensagem no front end
                      'name': element.mensagem,
                      'statusEnvio': 'recebido',//não permitir enviar mensagem senao conectado no server depois mudo isso
                      //'statusDestino': 'recebido',
                      'dateTime': date
                  }
          
                  this.setState({
                      contacts: this.state.contacts.concat(newMsg)
  
                  })
  
                  this.onLayout()
                  
                  
              
                }else{
                    alert('element.PhoneSend is != phoneNumber')
                    
                    
                }
                
            });

          }
          
        
        
        })


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

    testarConexao = () => {
        //só testar se ta conectado
        //perceba que tem que ser o IP da maquina onde esta o server
        //não é localhost porque o device esta emulado!!!!!

        const url1 = 'http://192.168.0.103/my-api/index.php';
    
    
        
        fetch(url1)
      
          .then((response) => response.json())
          .then((res) => {
              if(res.status === "Banco de dados conectado"){
                  this.setState({conectado: true})
              }else{
                  alert(res.status)
              }
            //alert(res.status)
            console.log(res.status)
        })
        
    
    }

    getMessageFromTextInputUser(){
        this.testarConexao()
        console.log(this.state.conectado)

        if(this.state.messageInputTemp === null){
            return 0
        }else
            {
                var date = new Date()
                var cont = this.state.contacts.length+1
                var newMsg = {
                    'id': cont.toString(),
                    'phone': this.state.contato.phoneNumber,
                    'type': 'send',//define o lado da mensagem no front end
                    'name': this.state.messageInputTemp,
                    'statusEnvio': 'enviado',//não permitir enviar mensagem senao conectado no server depois mudo isso
                    //'statusDestino': 'recebido',
                    'dateTime': date
                }

                //----------- momento em que envia para o servidor ----------

                    //experimental
                    var url2 = "http://192.168.0.103/my-api/saveMsg.php";

                    fetch(url2,{
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json', 
                    },
                    
                      body: JSON.stringify({
                          
                        'phone': this.state.contato.phoneNumber,
                        'phoneSend': this.state.value,
                        'statusEnvio': 'enviado',
                        'dateTime': date,
                        'name': this.state.messageInputTemp,
                        

                      })
                      
                    })
                
                    .then((response) => response.json())
                    .then((res) => {
                      
                      //alert(res.message);
                      
                      
                    })



                //-----------------------------------------------------------
        
        
        
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

    clearAll = async () => {// deletar todos os dados salvos localmente no aparelho
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
    }

    componentDidMount = () => {
        this.setHeader()
        setInterval(() => {// a cada 1 segundo procurando por mensagens novas
            this.findMessage();
            console.log("find\n")
        }, 1000);
    }

    
    setHeader = () => {
        this.state.navigation.setOptions({
            title: false,
            headerStyle: styles.header,
            headerLeft: false,
                
                
            headerLeft: () => (
                <View style={styles.contato}>
                    <TouchableOpacity
                        onPress={() => this.state.navigation.navigate('LogadoApp')}
                    >
                        <Text style={{
                            fontSize: 20,
                            marginLeft: 5,
                            marginRight: 25,
                            color: 'blue',
                            fontWeight: 'bold'
                        }}
                        >{'< voltar'}</Text>
                    </TouchableOpacity>
                    <Image
                        style={styles.foto}
                        source={{uri: btnContatosImage}}
                    >
                    </Image>
                    <Text style={styles.contatoNome}>{this.state.contato.nameContact}</Text>
                  
              </View>
            )
        })
    }
    
    
    
    render(){
        //console.log(this.state.contacts)
        

        setTimeout(()=>{
            this.onLayout()
            this.StoreConversation(this.state.contacts, this.state.contato.phoneNumber)
        },1000)

        

      return(
            <View style={styles.masterView}>

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
                <KeyboardAvoidingView //esse bichinho aqui ajuda no ios a não tampar os outros componentes importantes como o input por exemplo
                    behavior={ Platform.OS === "ios" ? "padding" : null }
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                    
                    >
                    <ScrollView>
                        <View style={styles.inputView}>
                            <TextInput
                                value={this.state.messageInputTemp}
                                onChangeText={(text)=>this.setState({messageInputTemp: text})}
                                multiline
                                style={styles.inputMessage} placeholder="  type message">
                            </TextInput>
                            <TouchableOpacity
                                onPress={()=>this.getMessageFromTextInputUser()}
                                style={styles.btnSendMessage} title=">">
                                <Text style={{color: 'white', fontSize: 25}}>{'->'}</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </ScrollView>
                    
                </KeyboardAvoidingView>

            </View>
        
        
      );
    }
  
}


