import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Padding from '../../../uikit/atoms/Padding'
import { CryptoInfo } from '../store'
import { Navigation } from '../../../app/types'

type Props = {
  cryptoInfo: CryptoInfo
  navigation: Navigation
}

export default function CryptoItem(props: Props) {
  const { cryptoInfo, navigation } = props

  function onCryptoPress() {
    navigation.navigate('Details', { id: cryptoInfo.id})
  }

  return (
    <View style={{ borderBottomWidth: 0.5,  borderColor: '#000', backgroundColor: '#333' }}>
      <TouchableOpacity onPress={onCryptoPress}>
        <Padding>
          <Text style={{ color: 'white' }}>{cryptoInfo.name}</Text>
        </Padding>
      </TouchableOpacity>
    </View>
  )
}
