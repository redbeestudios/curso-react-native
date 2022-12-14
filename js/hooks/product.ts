import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'
import { NativeModules } from 'react-native'
import { Product } from '../domain'

const INITIAL_PRODUCTS: Product[] = Array.from({ length: 10 }).map(() => ({
  id: uuid(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
}))

export const useProducts = (): Product[] => {
  const [state, setState] = useState<Product[] | undefined>(undefined)

  useEffect(() => {
    NativeModules.ProductModule.getProducts().then(
      (products: Product[] | undefined) => {
        if (products) {
          setState(products)
          return
        }

        NativeModules.ProductModule.initializeProducts(INITIAL_PRODUCTS)
        setState(INITIAL_PRODUCTS)
      },
    )
  }, [])

  return state ?? []
}
