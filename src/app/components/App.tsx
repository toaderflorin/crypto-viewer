import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Details from '../../modules/details/components/Details'
import Home from '../../modules/home/components/Home'
import Settings from '../../modules/settings/components/Settings'

const TabNavigator = createBottomTabNavigator({
  Home,  
  Details,
  Settings
})

export default createAppContainer(TabNavigator)
