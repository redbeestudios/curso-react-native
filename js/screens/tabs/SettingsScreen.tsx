import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import { Screen } from '../../components'

export const SettingsScreen: FunctionComponent = () => {
  return (
    <Screen style={styles.screen}>
      <Text style={styles.text}>Settings Screen</Text>
    </Screen>
  )
}

const styles = StyleSheet.create<{
  screen: ViewStyle
  text: TextStyle
}>({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
