import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Contatos from './src/views/Contatos';




/**
 * importação das telas em src/views
 */
import EntrarApp  from "./src/views/EntrarApp";
import LogadoApp from "./src/views/LogadoApp";
import ReceberCodigoConfirmar from "./src/views/ReceberCodigoConfirmar";
import ChatApp from "./src/views/ChatApp";
import ReceberFoto from './src/views/ReceberFoto';

const Stack = createStackNavigator();

//rotas de navegação
/*
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
*/


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EntrarApp" component={EntrarApp} />
        <Stack.Screen name="LogadoApp" component={LogadoApp} />
        <Stack.Screen name="ReceberCodigoConfirmar" component={ReceberCodigoConfirmar} />
        <Stack.Screen name="ReceberFoto" component={ReceberFoto} />
        <Stack.Screen name="Contatos" component={Contatos} />
        <Stack.Screen name="ChatApp" component={ChatApp} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



