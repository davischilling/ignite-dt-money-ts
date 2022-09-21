import { QueryKey } from 'react-query'

export const getTransactionsListKey = (query?: string): QueryKey => [
  'getTransactionsList',
  query,
]
