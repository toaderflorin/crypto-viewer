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
    <View style={{ borderBottomWidth: 1,  borderColor: '#ddd', backgroundColor: 'white' }}>
      <TouchableOpacity onPress={onCryptoPress}>
        <Padding>
          <Text>{JSON.stringify(cryptoInfo)}</Text>
        </Padding>
      </TouchableOpacity>
    </View>
  )
}
