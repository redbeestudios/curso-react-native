import React, { FunctionComponent, PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

export interface ScreenProps {
  style?: StyleProp<ViewStyle>
}

export const Screen: FunctionComponent<PropsWithChildren<ScreenProps>> = ({
  children,
  style,
}) => {
  return <View style={[styles.screen, style]}>{children}</View>
}

const styles = StyleSheet.create<{ screen: ViewStyle }>({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
})
