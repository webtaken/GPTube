export interface Subscription {
  id: string
  name: string
  subType: 'hobby' | 'popular'
  benefits: JSX.Element[]
  price: number
  checkoutURL: string
}
