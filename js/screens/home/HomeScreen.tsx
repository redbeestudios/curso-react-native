import React, { FunctionComponent, useCallback, useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { Button, ProductCard } from '../../components'
import { extractKeyFromEntity, Product } from '../../domain'
import {
  useFilteredProducts,
  useNavigateToProduct,
  useProductIndex,
  useProducts,
} from '../../hooks'
import { v4 as uuid } from 'uuid'

export const HomeScreen: FunctionComponent = () => {
  const { products, createProduct, deleteProduct } = useProducts()
  const [search, setSearch] = useState('')
  const navigateToProduct = useNavigateToProduct()

  const productIndex = useProductIndex(products)
  const filteredProducts = useFilteredProducts(productIndex, products, search)

  const renderProduct: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <ProductCard
        onPressName={navigateToProduct.bind(null, item)}
        product={item}
        style={styles.productCard}
        onDelete={deleteProduct}
      />
    ),
    [deleteProduct, navigateToProduct],
  )

  const emptyAction = useCallback(() => {
    createProduct({ name: search, description: '', id: uuid() })
  }, [createProduct, search])

  const screenStyles: StyleProp<ViewStyle> = [styles.screen]
  const productListStyles: StyleProp<ViewStyle> = [styles.productList]

  if (!filteredProducts.length) {
    screenStyles.push(styles.screenEmpty)
    productListStyles.push(styles.productListEmpty)
  }

  return (
    <SafeAreaView style={screenStyles}>
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
        contentContainerStyle={productListStyles}
        data={filteredProducts}
        keyExtractor={extractKeyFromEntity}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyLabel}>
              No product named <Text style={styles.emptyTerm}>{search}</Text>{' '}
              found
            </Text>
            <Button
              onPress={emptyAction}
              style={styles.emptyButton}
              fontSize={18}>
              Create it
            </Button>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create<{
  screen: ViewStyle
  screenEmpty: ViewStyle
  productCard: ViewStyle
  productList: ViewStyle
  productListEmpty: ViewStyle
  header: ViewStyle
  search: TextStyle
  emptyContainer: ViewStyle
  emptyLabel: TextStyle
  emptyTerm: TextStyle
  emptyButton: ViewStyle
}>({
  screen: { backgroundColor: '#EEE', flex: 1 },
  screenEmpty: { backgroundColor: '#FFF' },
  productCard: { margin: 10 },
  productList: { paddingBottom: 100 },
  productListEmpty: {
    paddingBottom: 0,
  },
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
  emptyContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    paddingTop: '50%',
  },
  emptyLabel: {
    color: '#000',
    fontSize: 18,
  },
  emptyTerm: {
    fontWeight: 'bold',
  },
  emptyButton: {
    marginTop: 20,
  },
})
