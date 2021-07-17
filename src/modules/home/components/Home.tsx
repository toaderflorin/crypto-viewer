import React, { useEffect } from 'react'
import Screen from '../../../uikit/atoms/Screen'
import { Text } from 'react-native'
import Padding from '../../../uikit/atoms/Padding'
import * as api from '../services/api'

export default function Home() {
  useEffect(() => {
    api.loadCryptos()
  }, [])

  return (
    <Screen>
      <Padding>
        <Text>Home</Text>
      </Padding>
    </Screen>
  )
}
