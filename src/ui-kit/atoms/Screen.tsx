import React from 'react'
import { View } from 'react-native'

function Screen(props: any) {
  const { children } = props

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  )
}

export default Screen
