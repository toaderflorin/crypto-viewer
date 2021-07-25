import React, { useEffect } from 'react'
import Screen from '../../../uikit/atoms/Screen'
import { useAppContext } from '../../../app/hooks/useAppContext'
import * as store from '../store'
import { createStackNavigator } from '@react-navigation/stack'
import Details from './Details'
import { Navigation } from '../../../app/types'
import CryptoItem from './CryptoItem'

type Props = {
  navigation: Navigation
}

export default function Home(props: Props) {
  const { navigation } = props
  const { state, dispatch } = useAppContext()
  const homeState = state.home
  const catalog = homeState.cryptoCatalog.data.slice(0, 20)

  useEffect(() => {
    dispatch(store.loadCryptos())
  }, [])

  return (
    <Screen>
     {catalog.map(crypto => (
       <CryptoItem cryptoInfo={crypto} navigation={navigation} />
     ))}
    </Screen>
  )
}
