export type PostTransaction = {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}
