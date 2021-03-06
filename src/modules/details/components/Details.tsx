import React, { useEffect } from 'react'
import Screen from '../../../uikit/atoms/Screen'
import { Text, View } from 'react-native'
import { Navigation } from '../../../app/types'
import Svg, { Rect } from 'react-native-svg'
import { useAppContext } from '../../../app/hooks/useAppContext'
import * as store from '../store'
import * as _ from 'lodash'

type Props = {
  navigation: Navigation
  route: any
}

export default function Details(props: Props) {
  const { route } = props
  const { state, dispatch } = useAppContext()

  console.log('STATE', state)

  const candles = state.details.details.data
  const minTime = _.min(candles.map(candle => candle.timestamp))
  const maxTime = _.max(candles.map(candle => candle.timestamp))
  const minValue = _.min(candles.map(candle => candle.low))
  const maxValue = _.max(candles.map(candle => candle.high))
  const timeStep = (maxTime - minTime) / candles.length

  function normalizeValue(min: number, max: number, value: number) {
    return (value - min) / (max - min)
  }

  function getCandleBodies() {
    return candles.map(candle => {
      const color = candle.open > candle.close ? '#1c9' : '#f25'

      const x0 = normalizeValue(minTime, maxTime, candle.timestamp) * 100
      const x1 = x0 + 0.5
      const y0 = (1 - normalizeValue(minValue, maxValue, candle.open)) * 100
      const y1 = (1 - normalizeValue(minValue, maxValue, candle.close)) * 100
      const l0 = (1 - normalizeValue(minValue, maxValue, candle.low)) * 100
      const l1 = (1 - normalizeValue(minValue, maxValue, candle.high)) * 100

      return (
        <>
          <Rect
            key={`body-${candle.timestamp}`}
            x={x0}
            y={_.min([y0, y1])}
            width={Math.abs(x1 - x0)}
            height={Math.abs(y1 - y0)}
            fill={color}
          />

          <Rect
            key={`line-${candle.timestamp}`}
            x={x0 + 0.15}
            y={_.min([l0, l1])}
            width={0.15}
            height={Math.abs(l1 - l0)}
            fill={color}
          />
        </>
      )
    })
  }

  useEffect(() => {
    dispatch(store.loadCryptoChart(route.params.id))
  }, [route.params.id])

  return (
    <Screen>
      <View>
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          {getCandleBodies()}
        </Svg>
      </View>      
    </Screen>
  )
}
