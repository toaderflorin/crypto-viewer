import { DarkTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import Details from '../../modules/details/components/Details'
import Home from '../../modules/home/components/Home'
import AppContextProvider from './AppContext'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(30, 30, 30)',
    card: 'rgb(30, 30, 30)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(50, 50, 50)',
    notification: 'rgb(255, 69, 58)'
  }
}

export default function App() {
  return (
    <AppContextProvider>
      <StatusBar barStyle="light-content" />      
      <NavigationContainer theme={MyTheme}>        
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  )
}
