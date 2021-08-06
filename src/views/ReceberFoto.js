import React, { useCallback, useState, useEffect, Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, Image, Platform, TextInput, requireNativeComponent } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ReceberFoto extends Component {
    constructor( { route, navigation }){
        super();
        const { valid, type, value, publicName, publicPhoto } = route.params;
        this.state = {
            navigation: navigation,
            valid: valid,
            type: type,
            value: value,
            publicName: '',// esta vazio porque logico ele sta na tela de inserir o nome e tals
            publicPhoto: ''// esta vazio porque asincronamente esta vindo a imagem default para este state e o usuario ainda pode altereala
        }

        
        this.ReqPermiss()
        this.defaultPhoto()
        
        

    }

    defaultPhoto = async () => {
        var [{ localUri }] = await Asset.loadAsync(require('../../assets/user.png'));
        console.log(localUri)
        this.setState({publicPhoto: localUri})
    }

    ReqPermiss = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }


    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result.uri)//this image :)
        
        if (!result.cancelled) {
            this.setState({publicPhoto: result.uri})
          }
    }

    //storing full information this user
    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@phoneSaveTeste4', jsonValue)
        } catch (e) {
        // saving error
            console.log("erro ao salvar")
        }
    }

    validarForm(){
        if(this.state.publicName != ''){
            console.log(this.state)
            this.storeData(this.state)
            
            
            this.state.navigation.navigate('LogadoApp', {
                valid: this.state.valid,
                type: this.state.type,
                value: this.state.value,
                publicName: this.state.publicName,
                publicPhoto: this.state.publicPhoto,

            })
            
        }
    }
    
    

    render(){
        console.log(this.state.publicName)
        return (
            <View style={styles.container}>
                <View style={styles.container_image_textInput}>
                
                { this.state.publicPhoto != '' && <TouchableOpacity onPress={this.pickImage}><Image style={styles.publicPhoto} source={{uri: this.state.publicPhoto}} ></Image></TouchableOpacity>}
                
                <TextInput onChangeText={text => this.setState({publicName: text})} style={styles.inputStyle} placeholder="Type your name"></TextInput>
                </View>
                <View>
                    <Button onPress={() => this.validarForm()} title="Continue"></Button>
                </View>

            </View>
            
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        paddingTop: 10,
      },
    container_image_textInput: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
      padding: 20,
      paddingTop: 10,
      flexDirection: 'row'
    },
    inputStyle: {
        fontSize: 40,
        marginLeft: 10
    },
    viewDoBtn: {
        top: 60
    },
    publicPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 50,
    }

});