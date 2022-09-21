import { QueryKey } from 'react-query'

export const getTransactionKey = (id: string): QueryKey => [
  'getTransaction',
  id,
]
