import React, { FunctionComponent } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SettingsScreen } from '../screens'
import { TabParamList, TabRoutes } from '../routes'
import { HomeTabNavigator } from './HomeTabNavigator'
import { Text } from 'react-native'

const Navigator = createBottomTabNavigator<TabParamList>()

export const TabNavigator: FunctionComponent = () => {
  return (
    <Navigator.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ color }) => {
          let label: string = ''

          switch (route.name) {
            case TabRoutes.Home:
              label = 'Home'
              break
            case TabRoutes.Settings:
              label = 'Settings'
              break
          }

          return <Text style={{ color }}>{label}</Text>
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = ''

          if (route.name === TabRoutes.Home) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === TabRoutes.Settings) {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}>
      <Navigator.Screen name={TabRoutes.Home} component={HomeTabNavigator} />
      <Navigator.Screen name={TabRoutes.Settings} component={SettingsScreen} />
    </Navigator.Navigator>
  )
}
