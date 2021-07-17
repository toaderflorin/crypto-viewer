import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
  children: ReactNode
}

export default function Screen(props: Props) {
  const { children } = props

  return (
    <View style={styles.screen}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40
  }
})
