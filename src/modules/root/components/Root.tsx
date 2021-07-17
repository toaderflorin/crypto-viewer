import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Details from '../../details/components/Details'
import Home from '../../home/components/Home'
import Settings from '../../settings/components/Settings'

const TabNavigator = createBottomTabNavigator({
  Home,  
  Details,
  Settings
})

export default createAppContainer(TabNavigator)
