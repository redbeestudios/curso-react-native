import React, { FunctionComponent, ReactElement } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { PRIMARY_COLOR } from './const'

export interface ButtonProps {
  children: string | ReactElement
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onPress,
  style,
}) => {
  if (typeof children === 'string') {
    children = <Text style={styles.text}>{children}</Text>
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create<{
  container: ViewStyle
  text: TextStyle
}>({
  container: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    color: '#FFF',
  },
})
