import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1  
  }
})

function Screen(props: any) {
  const { children } = props

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  )
}

export default Screen
