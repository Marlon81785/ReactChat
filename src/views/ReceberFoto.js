import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Button, Image, Platform, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles/ReceberFotoStyles';


export default class ReceberFoto extends Component {
    constructor( { route, navigation }){
        super();
        const { value, publicName, publicPhoto } = route.params;
        this.state = {
            navigation: navigation,
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
                value: this.state.value,
                publicName: this.state.publicName,
                publicPhoto: this.state.publicPhoto,

            })
            
        }
    }
    
    

    render(){
        console.log('nome -> ' + this.state.publicName)
        console.log('Foto -> ' + this.state.publicPhoto)
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
