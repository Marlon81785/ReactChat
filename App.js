import React, { useCallback, useState, Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Contatos from './src/views/Contatos';




/**
 * importação das telas em src/views
 */
import EntrarApp  from "./src/views/EntrarApp";
import LogadoApp from "./src/views/LogadoApp";
import ReceberCodigoConfirmar from "./src/views/ReceberCodigoConfirmar";
import ChatApp from "./src/views/ChatApp";
import ReceberFoto from './src/views/ReceberFoto';



//rotas de navegação
const AppNavigator = createStackNavigator(
  {
    EntrarApp: {
      screen: EntrarApp,
      navigationOptions:  { title: 'Configurar sua conta'},
    },
    LogadoApp: {
      screen: LogadoApp,
      navigationOptions: { title: 'Conversas', headerLeft: null },
    },
    ReceberCodigoConfirmar: {
      screen: ReceberCodigoConfirmar,
      navigationOptions: { title: 'Confirmação', headerLeft: null , headerRight: null },
    },
    ReceberFoto: {
      screen: ReceberFoto,
      navigationOptions: { title: 'Configurações da conta'}
    },
    Contatos: {
      screen: Contatos,
      navigationOptions: { title: 'Contatos' }
    },
    ChatApp: {
      screen: ChatApp,
      navigationOptions: { headerShown: false },
      
    }
  },
  {
    initialRouteName: 'EntrarApp'
  }
);
const AppContainer = createAppContainer (AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer/>;
      
  }
}



