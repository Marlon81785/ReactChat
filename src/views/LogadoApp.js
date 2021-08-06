import React, { useCallback, useState, Component } from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';

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
      const { valid, type, value, publicName, publicPhoto } = route.params;
      this.state = {
        navigation: navigation,
        valid: valid,
        type: type,
        value: value,
        publicName: publicName,
        publicPhoto: publicPhoto,

      }
      this.verificarSeTemNome()
      
      
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
                  valid: this.state.valid,
                  type: this.state.type,
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
            valid: this.state.valid,
            type: this.state.type,
            value: this.state.value,
            publicName: this.state.publicName,
            publicPhoto: this.state.publicPhoto,

          })
        }
      }


    
    render(){
      return(
        <SafeAreaView style={styles.container}>
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
            
            
            
        </SafeAreaView>
        
      );
    }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  contact: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    margin: 2,
    borderRadius: 6
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  btnContatosImage: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 70,
    height: 70,
    right: 10,
    bottom: 10,
    borderRadius: 50
    

    
  }
  

});