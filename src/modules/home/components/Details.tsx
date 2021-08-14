import React, { useEffect } from 'react'
import Screen from '../../../uikit/atoms/Screen'
import { Text } from 'react-native'
import Padding from '../../../uikit/atoms/Padding'
import { Navigation } from '../../../app/types'
import Svg, { Circle, Rect } from 'react-native-svg'
import { useAppContext } from '../../../app/hooks/useAppContext'
import * as store from '../store'

type Props = {
  navigation: Navigation
  route: any
}

export default function Details(props: Props) {
  const { route } = props
  const { state, dispatch } = useAppContext()

  async function loadCryptoDetails() {   
    dispatch(store.loadCryptoChart(route.param.id))
  }

  useEffect(() => {
    loadCryptoDetails()
  })

  return (
    <Screen>
      <Padding>
        <Text>Details</Text>
        <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
          <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
          <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
        </Svg>
      </Padding>
    </Screen>
  )
}
