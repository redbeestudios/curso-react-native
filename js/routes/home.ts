export enum HomeStackRoutes {
  Home = 'Home',
  Product = 'Product',
}

export type HomeStackParamList = {
  [HomeStackRoutes.Home]: {}
  [HomeStackRoutes.Product]: { name: string; description: string }
}
