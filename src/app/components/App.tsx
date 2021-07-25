import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Details from '../../modules/details/components/Details'
import Home from '../../modules/home/components/Home'
import Settings from '../../modules/settings/components/Settings'
import AppContextProvider from './AppContext'

const TabNavigator = createBottomTabNavigator({
  Home,
  Details,
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
