import React, { FunctionComponent } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { TopNavigator } from './navigators'

export const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <TopNavigator />
    </NavigationContainer>
  )
}
