import { QueryKey } from 'react-query'
import { Pagination } from './types'

export const getTransactionsListKey = (pagination: Pagination): QueryKey => [
  'getTransactionsList',
  pagination,
]
