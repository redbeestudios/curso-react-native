import React, { FunctionComponent } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { HomeStackParamList, HomeStackRoutes } from '../../routes'
import { Screen } from '../../components'

export const ProductScreen: FunctionComponent = () => {
  const { params } =
    useRoute<RouteProp<HomeStackParamList, HomeStackRoutes.Product>>()
  return (
    <Screen style={styles.screen}>
      <Text style={styles.name}>{params.name}</Text>
      <Text style={styles.description}>{params.description}</Text>
    </Screen>
  )
}

const styles = StyleSheet.create<{
  screen: ViewStyle
  name: TextStyle
  description: TextStyle
}>({
  screen: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 30,
    fontSize: 18,
  },
})
