import { useMemo } from 'react'
import { Product } from '../domain'

export type ProductIndex = Map<string, string[]>

export const useProductIndex = (products: Product[]): ProductIndex =>
  useMemo(
    () =>
      new Map(
        products.map(p => [
          p.id,
          [p.name.toLowerCase(), p.description.toLowerCase()],
        ]),
      ),
    [products],
  )

export const useFilteredProducts = (
  index: ProductIndex,
  products: Product[],
  search: string,
): Product[] => {
  const searchingFor = search.trim().toLowerCase()

  return products.filter(product => {
    const indexed = index.get(product.id)

    if (!indexed) {
      return false
    }

    return indexed.some(searchTerm => searchTerm.includes(searchingFor))
  })
}
