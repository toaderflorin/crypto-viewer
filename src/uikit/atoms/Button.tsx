import React from 'react'
import { Button as RnButton } from 'react-native'

type Props = {
  title: string
  onPress: () => void
}

export default function Button(props: Props) {
  const { title, onPress } = props

  return (
    <RnButton title={title} onPress={onPress} />
  )
}
