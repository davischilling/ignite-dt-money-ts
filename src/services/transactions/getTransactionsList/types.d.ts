export type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export type Pagination = {
  query?: string
  page?: number
  limit?: number
}
