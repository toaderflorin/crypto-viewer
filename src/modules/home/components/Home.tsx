import React, { useEffect } from 'react'
import Screen from '../../../uikit/atoms/Screen'
import { useAppContext } from '../../../app/hooks/useAppContext'
import * as store from '../store'
import { Navigation } from '../../../app/types'
import CryptoItem from './CryptoItem'
import { ScrollView } from 'react-native-gesture-handler'

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
      <ScrollView>
        {catalog.map(crypto => (
          <CryptoItem key={crypto.id} cryptoInfo={crypto} navigation={navigation} />
        ))}
      </ScrollView>
    </Screen>
  )
}
