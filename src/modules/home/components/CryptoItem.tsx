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
    navigation.navigate('Details', { id: cryptoInfo.id })
  }

  const style = {
    borderBottomWidth: 0.5,
    borderColor: '#000',
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    height: 100,
    elevation: 5
  }  

  return (
    <View style={style}>
      <TouchableOpacity onPress={onCryptoPress}>
        <Padding>
          <Text style={{ color: 'white' }}>{cryptoInfo.name}</Text>
        </Padding>
      </TouchableOpacity>
    </View>
  )
}
