import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Details from './src/modules/details/components/Details'
import Home from './src/modules/home/components/Home'

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Details: Details
})

export default createAppContainer(TabNavigator)
