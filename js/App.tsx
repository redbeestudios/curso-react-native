import { faker } from '@faker-js/faker'
import React, { FunctionComponent, useCallback, useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
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
    ({ item }) => (
      <ProductCard
        product={item}
        style={styles.productCard}
        onDelete={deleteProduct}
      />
    ),
    [deleteProduct],
  )

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TextInput
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
        />
      </View>
      <FlatList<Product>
        renderItem={renderProduct}
        contentContainerStyle={styles.productList}
        data={filteredProducts}
        keyExtractor={extractKeyFromEntity}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create<{
  screen: ViewStyle
  productCard: ViewStyle
  productList: ViewStyle
  header: ViewStyle
  search: TextStyle
}>({
  screen: { backgroundColor: '#EEE' },
  productCard: { margin: 10 },
  productList: { paddingBottom: 100 },
  header: {
    backgroundColor: '#FFF',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  search: {
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    width: '90%',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
})
