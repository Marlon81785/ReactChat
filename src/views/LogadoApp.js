/**
 * essa tela aqui é para exibir as conversas na verdade apesar do nome contatos
 */

import React, { Component } from 'react';
import {TouchableOpacity, Text, View, Button, FlatList, Image, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles/LogadoAppStyles';
import { Asset } from 'expo-asset';
import * as Contacts from 'expo-contacts';

var btnContatosImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';



export default class LogadoApp extends Component{
    constructor({ route, navigation }) {
      super();
      const { value, publicName, publicPhoto, defaultIconUser } = route.params;
      this.state = {
        navigation: navigation,
        valid: 'valid',
        type: 'type',
        value: value,
        publicName: publicName,
        publicPhoto: publicPhoto,
        iconeContatos: '',
        defaultIconUser: defaultIconUser,
        contacts: null,
        contatosComConversa: [      
        ]

      }
      this.verificarSeTemNome()
      this.iconeContatos()
      this.getAllContactsV2()

      

      
    }

    reloadPage() {
      this.setState({
        contacts: null,
        contatosComConversa: []
      })
      this.getAllContactsV2();
    }

    iconeContatos = async () => {
      var [{ localUri }] = await Asset.loadAsync(require('../../assets/contact-book.png'));
      console.log(localUri)
      this.setState({iconeContatos: localUri})

    }
    

    clearAll = async () => {
      try {
        await AsyncStorage.clear()
      } catch(e) {
        // clear error
      }
    
      console.log('Done.')
    }



    //verify if existics data from piblic name 
    //key from phone number is : '@phoneSaveTeste4
      verificarSeTemNome = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@phoneSaveTeste4')
          if(jsonValue != null){
            console.log(JSON.parse(jsonValue).publicName)//exemplo de como acessar
            if(JSON.parse(jsonValue).publicName != undefined && JSON.parse(jsonValue).publicName != ""){
              console.log(jsonValue)
              return 0
              
            }else{
              if(JSON.parse(jsonValue).publicName == undefined || JSON.parse(jsonValue).publicName == ""){
                console.log('not saved public name')
                //jogar para tela de captura e salvamento do nome e foto
                this.state.navigation.navigate('ReceberFoto', {
                  value: this.state.value,
                  publicName: this.state.publicName,
                  publicPhoto: this.state.publicPhoto,

                })

              }
            }
            
            
          }
          //return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
          console.log('not saved public name')
          //jogar para tela de captura e salvamento do nome e foto
          this.state.navigation.navigate('ReceberFoto', {
            value: this.state.value,
            publicName: this.state.publicName,
            publicPhoto: this.state.publicPhoto,

          })
        }
      }

      async getAllContactsV2 () {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
  
          if (data.length > 0) {
            const contact = data;
            //this.setState({contacts: contact})
            //console.log(this.state.contacts)
            //console.log(contact);
            contact.map((contato) => {
              console.log(contato.phoneNumbers[0].number)
              this.getConversation(contato.phoneNumbers[0].number, contato)
              
            })
            
          }
          
        }
      
    }



    //verify if existics data from phone number valid in use
    //key from phone number is : '@phoneSaveTeste4
    getConversation = async (key, contato) => {

      try {
          const jsonValue = await AsyncStorage.getItem("@".concat(key))

          if(jsonValue != null){
              console.log("conversa encontrada para o numero: "+ key)
              //this.setState({conversa: JSON.parse(jsonValue)})
              //console.log(JSON.parse(jsonValue))
              this.setState({
                contatosComConversa: this.state.contatosComConversa.concat(contato)
              })
              this.setState({
                contacts: this.state.contatosComConversa
              })
          }else{
            console.log('nao possui conversa o numero: ' + key)
            
          }
     
      } catch(e) {
          // error reading value
          console.log('not saved conversation for phone number')
      }
    }


    
    render(){
      return(
        <SafeAreaView style={styles.container}>
            <Button onPress={()=> this.reloadPage()} title="update" ></Button>
            
          <FlatList
            data={this.state.contacts}
            renderItem={({item})=>
              (
                <View style={styles.contact}>
                  <TouchableOpacity onPress={()=>//alert(item.phoneNumbers[0].number)//
                    this.state.navigation.navigate('ChatApp', {
                      phone: item.phoneNumbers[0].number,
                      name: item.name,
                    })
                  }>
                    <View style={styles.contact}>
                      <Image
                        style={styles.foto}
                        source={{uri: this.state.defaultIconUser}}
                      >
                      </Image>
                      <View>
                        <Text style={{fontSize: 30, marginLeft: 9}}>{item.name}</Text>
                        <Text style={styles.phoneNumber}>{/*numero dos contatos*/}</Text>

                      </View>
                      
                    </View>
                    
                  </TouchableOpacity>
                </View>
              )}
            />
            { this.state.iconeContatos != '' &&
            <TouchableOpacity onPress={() => this.state.navigation.navigate('Contatos')} style={styles.btnContatosImage}>
              <Image
              style={{width: 70, height: 70}}
                source={{uri: this.state.iconeContatos}}
              ></Image>
            </TouchableOpacity>
            }
        </SafeAreaView>
        
      );
    }
  
}


