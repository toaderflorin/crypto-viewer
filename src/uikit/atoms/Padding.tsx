import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
  children: ReactNode
}

export default function Screen(props: Props) {
  const { children } = props

  return (
    <View style={styles.padding}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  padding: {  
    padding: 15
  }
})
