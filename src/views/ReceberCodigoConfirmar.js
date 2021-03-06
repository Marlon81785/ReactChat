import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ReceberCodigoConfirmar extends Component {
    constructor(props){
        super(props);
        this.state = {
            valid: this.props.navigation.state.params.valid,
            type: this.props.navigation.state.params.type,
            value: this.props.navigation.state.params.value,
            publicName: '',
            publicPhoto: '',
        }
        console.log(this.state)

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

    validateSecretCode(){
        let code = '1234'//code generated by server end send to user validade
        let userCode = '1234'
        if(userCode == code){
            try{
                this.storeData(this.state)
                this.props.navigation.navigate('LogadoApp', {
                    valid: this.state.valid,
                    type: this.state.type,
                    value: this.state.value,
                    publicName: this.state.publicName,
                    publicPhoto: this.state.publicPhoto,

                })
            }catch{
                this.storeData(this.state)
                this.props.navigation.navigate('LogadoApp', {
                    valid: this.state.valid,
                    type: this.state.type,
                    value: this.state.value,
                    publicName: this.state.publicName,
                    publicPhoto: this.state.publicPhoto,

                })
                

            }
            
        }
        
    }

    render(){
        this.validateSecretCode()//remover isso esta passando na autenticação de usuario
        return (
            <View style={styles.container}>
                <Text>Insira o código que recebeu por SMS</Text>
                <TextInput
                    style={styles.inputStyle}
                    autoFocus={true}
                    keyboardType="numeric"
                >
                    
                </TextInput>

                <View style={styles.viewDoBtn}>
                    <Button 
                        title='Continuar'
                        onPress=
                        {
                            () => this.props.navigation.navigate('LogadoApp')
                        }
                    >
                    </Button>
                </View>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      paddingTop: 40
    },
    inputStyle: {
        fontSize: 40
    },
    viewDoBtn: {
        top: 60
    },

});