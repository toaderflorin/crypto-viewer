import { ReactNode } from 'react'
import { Text as RnText } from 'react-native'

type Props = {
  children: ReactNode
}

function Text(props: Props) {
  const { children } = props

  return (
    <RnText>{children}</RnText>
  )
}

export default Text
