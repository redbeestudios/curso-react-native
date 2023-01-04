import { NavigationProp, useNavigation } from '@react-navigation/native'
import { HomeStackParamList, HomeStackRoutes } from '../routes'
import { useCallback } from 'react'
import { Product } from '../domain'

export const useNavigateToProduct = (): ((product: Product) => void) => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  return useCallback(
    ({ id, name, description }) => {
      navigation.navigate({
        name: HomeStackRoutes.Product,
        key: id,
        params: { name, description },
      })
    },
    [navigation],
  )
}
