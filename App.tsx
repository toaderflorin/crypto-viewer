import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Details from './src/modules/details/components/Details'
import Home from './src/modules/home/components/Home'
import Settings from './src/modules/settings/components/Settings'

const TabNavigator = createBottomTabNavigator({
  Home,  
  Details,
  Settings
})

export default createAppContainer(TabNavigator)
