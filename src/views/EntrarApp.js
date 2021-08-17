import React, { Component } from "react";
import { Text, View, TouchableOpacity, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from "./Styles/EntrarStyles";

export default class EntrarApp extends Component {
  constructor({ route, navigation }) {
    super();
    //this.storeData(null) //REMOVE ! THIS IS FOR TEST
    this.getData()

    this.state = {
      navigation: navigation,
      value: "",
    };
    

  }

  //storing information this phone """""" NOT USED IN THIS PAGE """" TESTER
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@phoneSaveTeste4', jsonValue)
    } catch (e) {
      // saving error
    }
  }


//verify if existics data from phone number valid in use
//key from phone number is : '@phoneSaveTeste4
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@phoneSaveTeste4')
      if(jsonValue != null){
        //console.log("Usuario valido encontrado")
        //console.log(JSON.parse(jsonValue))//exemplo de como acessar
        console.log("-------------------------Entrar APP Screen---------------------------")
        console.log('Salvo no aparelho localmente')
        console.log('number -> ' + JSON.parse(jsonValue).value + '\n')
        console.log('name -> ' + JSON.parse(jsonValue).publicName + '\n')
        console.log('photo -> ' + JSON.parse(jsonValue).publicPhoto + '\n')
        console.log("-------------------------------END----------------------------------")
        this.props.navigation.navigate('LogadoApp', {
          value: JSON.parse(jsonValue).value,
          publicName: JSON.parse(jsonValue).publicName,
          publicPhoto: JSON.parse(jsonValue).publicPhoto
        }); 
        
      }
      //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log('not saved phone number')
    }
  }

  confirmarTelefone() {
    this.state.navigation.navigate('ReceberCodigoConfirmar', {
      value: this.state.value
    })
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        <Text>Insira seu número de telefone</Text>
        <TextInput style={styles.input}
          placeholder='Ex.:  31999999999'
          onChangeText={ text => this.setState({value: text})}
          keyboardType="numeric"
        />
        <Button
          title='Continuar'
          onPress={ ()=> this.confirmarTelefone() }
        />
        
      </View>
    );
  }
}


