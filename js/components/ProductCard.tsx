import React, { FunctionComponent, useCallback } from 'react'
import { View, Text, Button } from 'react-native'
import { Product } from '../domain'

export interface ProductCardProps {
  product: Product
  onDelete?: (product: Product) => void
}

export const ProductCard: FunctionComponent<ProductCardProps> = ({
  product,
  onDelete,
}) => {
  const deleteProduct = useCallback(
    () => onDelete?.(product),
    [onDelete, product],
  )

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      {onDelete ? <Button onPress={deleteProduct} title="Borrar" /> : undefined}
    </View>
  )
}
