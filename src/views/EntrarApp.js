import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from "react-native-phone-input";

export default class EntrarApp extends Component {
  constructor() {
    super();
    //this.storeData(null) REMOVE ! THIS IS FOR TEST
    this.getData()

    this.state = {
      valid: "",
      type: "",
      value: "",
      publicName: '',
      publicPhoto: '',
    };
    

    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);

    
    
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
        console.log("Usuario valido encontrado")
        console.log(JSON.parse(jsonValue))//exemplo de como acessar
        this.props.navigation.navigate('LogadoApp', {
          valid: JSON.parse(jsonValue).valid,
          type: JSON.parse(jsonValue).type,
          value: JSON.parse(jsonValue).value,
          publicName: '',
          publicPhoto: ''
        }); 
      }
      //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log('not saved phone number')
    }
  }
  


  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });

    console.log(this.state)
    this.props.navigation.navigate('ReceberCodigoConfirmar', {
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    })
  }

  renderInfo() {
    if (this.state.value) {
      return (
        <View style={styles.info}>
          <Text>
            Is Valid:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
          </Text>
        </View>
      );
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Não é seu país? clique e altere</Text>
        <PhoneInput
          value=" "
          style={styles.phoneContainer}
          flagStyle={styles.phoneImage}
          textProps={styles.phoneText}
          initialCountry="br"
          ref={ref => {
            this.phone = ref;
            
          }}
        />

        <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
          <Text>Get Info</Text>
        </TouchableOpacity>

        {this.renderInfo()}
        <Button 
          title='Continuar'
          onPress=
          {
            () => this.updateInfo()//
          }
        >
        </Button>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 40
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 20
  },
  button: {
    marginTop: 20,
    padding: 10
  },
  phoneImage: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    width: 300,
    height: 120,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'blue'
  },
  phoneText: {
    flex:1,
    fontSize: 20,
    borderBottomWidth: 1,
    
    
  },
  phoneContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap"
  }
});
