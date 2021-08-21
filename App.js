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


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EntrarApp" component={EntrarApp} />
        <Stack.Screen name="LogadoApp" component={LogadoApp} options={{ title: 'Conversas', headerLeft: false }} />
        <Stack.Screen name="ReceberCodigoConfirmar" component={ReceberCodigoConfirmar} />
        <Stack.Screen name="ReceberFoto" component={ReceberFoto} />
        <Stack.Screen name="Contatos" component={Contatos} />
        <Stack.Screen name="ChatApp" component={ChatApp} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}



