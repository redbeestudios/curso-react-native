import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'
import { HomeStackParamList, HomeStackRoutes } from '../routes'
import { HomeScreen, ProductScreen } from '../screens'

const Navigator = createNativeStackNavigator<HomeStackParamList>()

export const HomeTabNavigator: FunctionComponent = () => {
  return (
    <Navigator.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={HomeStackRoutes.Home}>
      <Navigator.Screen name={HomeStackRoutes.Home} component={HomeScreen} />
      <Navigator.Screen
        name={HomeStackRoutes.Product}
        component={ProductScreen}
      />
    </Navigator.Navigator>
  )
}
