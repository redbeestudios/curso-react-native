import { faker } from '@faker-js/faker'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { FlatList, ListRenderItem, SafeAreaView, TextInput } from 'react-native'
import { v4 as uuid } from 'uuid'
import { ProductCard } from './components'
import { extractKeyFromEntity, Product } from './domain'
import { useFilteredProducts, useProductIndex } from './hooks'

const INITIAL_PRODUCTS: Product[] = Array.from({ length: 10 }).map(() => ({
  id: uuid(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
}))

export const App: FunctionComponent = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [search, setSearch] = useState('')

  const productIndex = useProductIndex(products)
  const filteredProducts = useFilteredProducts(productIndex, products, search)

  const deleteProduct = useCallback(
    (product: Product) =>
      setProducts(prev => prev.filter(p => p.id !== product.id)),
    [],
  )

  const renderProduct: ListRenderItem<Product> = useCallback(
    ({ item }) => <ProductCard product={item} onDelete={deleteProduct} />,
    [deleteProduct],
  )

  return (
    <SafeAreaView>
      <TextInput value={search} onChangeText={setSearch} />
      <FlatList<Product>
        renderItem={renderProduct}
        data={filteredProducts}
        keyExtractor={extractKeyFromEntity}
      />
    </SafeAreaView>
  )
}
