import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { NativeModules } from 'react-native'
import { Product } from '../domain'

const INITIAL_PRODUCTS: Product[] = Array.from({ length: 10 }).map(() => ({
  id: uuid(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
}))

export interface ProductsApi {
  products: Product[]
  deleteProduct: (id: string) => void
  createProduct: (product: Product) => void
}

export const useProducts = (): ProductsApi => {
  const [state, setState] = useState<Product[] | undefined>(undefined)

  const createProduct = useCallback((product: Product) => {
    setState(prev => [...(prev ?? []), product])
    NativeModules.ProductModule.createProduct(product)
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setState(prev => prev?.filter(p => p.id !== id))
    NativeModules.ProductModule.deleteProduct(id)
  }, [])

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

  return useMemo(
    () => ({
      products: state ?? [],
      createProduct,
      deleteProduct,
    }),
    [createProduct, deleteProduct, state],
  )
}
