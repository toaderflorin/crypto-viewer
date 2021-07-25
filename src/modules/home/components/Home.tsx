import React, { useEffect } from 'react'
import Screen from '../../../uikit/atoms/Screen'
import { useAppContext } from '../../../app/hooks/useAppContext'
import CryptoItem from './CryptoItem'
import * as store from '../store'
import { ScrollView } from 'react-navigation'
import { Navigation } from '../../../app/types'
import { createStackNavigator } from '@react-navigation/stack'
import Details from '../../details/components/Details'
import Text from '../../../uikit/atoms/Text'

type Props = {
  navigation: Navigation
}

const Stack = createStackNavigator()

export default function Home(props: Props) {
  const { navigation } = props
  const { state, dispatch } = useAppContext()
  const homeState = state.home
  const catalog = homeState.cryptoCatalog.data.slice(0, 20)

  useEffect(() => {
    dispatch(store.loadCryptos())
  }, [])

  return (
    // <Screen>
    //   <Text>Some text</Text>
    // </Screen>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Details} />
    </Stack.Navigator>
  )
}
