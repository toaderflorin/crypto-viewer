import { ReactNode } from 'react'
import { Text as RnText } from 'react-native'

type Props = {
  children: ReactNode
}

export default function Text(props: Props) {
  return (
    <RnText></RnText>
  )
}

