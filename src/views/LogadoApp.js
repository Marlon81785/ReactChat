import React, { Component } from 'react';
import {TouchableOpacity, Text, View, Button, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';
import { styles } from './Styles/LogadoAppStyles';

var btnContatosImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Fulano De Tal',
    image: btnContatosImage,

  },
  
];



export default class LogadoApp extends Component{
    constructor({ route, navigation }) {
      super();
      const { value, publicName, publicPhoto } = route.params;
      this.state = {
        navigation: navigation,
        valid: 'valid',
        type: 'type',
        value: value,
        publicName: publicName,
        publicPhoto: publicPhoto,

      }
      //this.verificarSeTemNome()
      
      
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


    
    render(){
      return(
        <View style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({item})=>
              (
                <View style={styles.contact}>
                  <TouchableOpacity style={styles.contact}>
                    <Image
                      style={styles.foto}
                      source={{uri: btnContatosImage}}
                    >
                    </Image><Text style={{fontSize: 30, marginLeft: 9}}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <TouchableOpacity onPress={() => this.state.navigation.navigate('Contatos')} style={styles.btnContatosImage}>
              <Image
              style={{width: 70, height: 70}}
                source={{uri: btnContatosImage}}
              ></Image>
            </TouchableOpacity>
            
            
            
        </View>
        
      );
    }
  
}


