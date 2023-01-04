import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'
import { MainStackParamList, MainStackRoutes } from '../routes'
import { TabNavigator } from './TabNavigator'

const Navigator = createNativeStackNavigator<MainStackParamList>()

export const TopNavigator: FunctionComponent = () => {
  return (
    <Navigator.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MainStackRoutes.Main}>
      <Navigator.Screen name={MainStackRoutes.Main} component={TabNavigator} />
    </Navigator.Navigator>
  )
}
