import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Details from '../../modules/home/components/Details'
import Home from '../../modules/home/components/Home'
import Settings from '../../modules/settings/components/Settings'
import AppContextProvider from './AppContext'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>    
  )
}

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  Settings
})

const TabNavigatorContainer = createAppContainer(TabNavigator)

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <TabNavigatorContainer />
      </NavigationContainer>
    </AppContextProvider>
  )
}
