import React, { FunctionComponent, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native'
import { Product } from '../domain'
import { Button } from './Button'
import { FONT_COLOR } from './const'

export interface ProductCardProps {
  product: Product
  onDelete?: (id: string) => void
  style?: StyleProp<ViewStyle>
}

export const ProductCard: FunctionComponent<ProductCardProps> = ({
  product,
  onDelete,
  style,
}) => {
  const deleteProduct = useCallback(
    () => onDelete?.(product.id),
    [onDelete, product],
  )

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      {onDelete ? (
        <Button style={styles.deleteButton} onPress={deleteProduct}>
          Delete
        </Button>
      ) : undefined}
    </View>
  )
}

const styles = StyleSheet.create<{
  container: ViewStyle
  name: TextStyle
  description: TextStyle
  deleteButton: ViewStyle
}>({
  container: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
  },
  name: {
    color: FONT_COLOR,
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: FONT_COLOR,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
})
