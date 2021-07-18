import React, { useEffect } from 'react'
import Screen from '../../../uikit/atoms/Screen'
import { Text } from 'react-native'
import Padding from '../../../uikit/atoms/Padding'
import * as api from '../services/api'
import { useAppContext } from '../../../app/hooks/useAppContext'

export default function Home() {
  const { state, dispatch } = useAppContext()
  const homeState = state.home
  const catalog = homeState.cryptoCatalog

  useEffect(() => {
    // api.loadCryptos()
  }, [])

  return (
    <Screen>
      <Padding>
        <Text>{JSON.stringify(catalog.slice(0, 50))}</Text>
      </Padding>
    </Screen>
  )
}
