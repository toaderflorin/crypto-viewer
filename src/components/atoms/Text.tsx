import { ReactNode } from 'react'
import { Text as RnText } from 'react-native'

type Props = {
  children: ReactNode
}

function Text(props: Props) {
  return (
    <RnText></RnText>
  )
}

export default Text
