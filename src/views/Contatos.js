import React, { useEffect ,useCallback, useState, Component } from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { PermissionsAndroid } from 'react-native';
//import Contacts from 'react-native-contacts';
import * as Contacts from 'expo-contacts';
import { Asset } from 'expo-asset';

var btnContatosImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';


export default class Contatos extends Component{
    state = {
        contacts: []
    }

    constructor(props) {
      super(props);
      
      this.getAllContacts()
      this.defaultPhoto()
    }

    defaultPhoto = async () => {
      var [{ localUri }] = await Asset.loadAsync(require('../../assets/user.png'));
      console.log(localUri)
      btnContatosImage = localUri
    }
    
    async getAllContacts () {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
  
          if (data.length > 0) {
            const contact = data;
            this.setState({contacts: contact})
            console.log(contact);
            console.log(this.state.contacts)
            
          }
        }
      
    }
    
    
    render(){
      return(
        <SafeAreaView style={styles.container}>
          <Button onPress={()=>this.getAllContacts()} title="update" ></Button>
            
            
          <FlatList
            data={this.state.contacts}
            renderItem={({item})=>
              (
                <View style={styles.contact}>
                  <TouchableOpacity onPress={()=>//alert(item.phoneNumbers[0].number)//
                    this.props.navigation.navigate('ChatApp', {
                      phone: item.phoneNumbers[0].number,
                      name: item.name,
                    })
                  }>
                    <View style={styles.contact}>
                      <Image
                        style={styles.foto}
                        source={{uri: btnContatosImage}}
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
  phoneNumber: {
    marginLeft: 10
  }
  
  
    

    
  
  

});