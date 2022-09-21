import { useQuery } from 'react-query'
import { getTransactionsList } from './getTransactionsList'
import { getTransactionsListKey } from './key'
import { Pagination } from './types'

export const useGetTransactionsList = (
  pagination: Pagination,
  // options?: UseQueryOptions<Transaction[]>,
) => {
  return useQuery(
    getTransactionsListKey(pagination),
    () => getTransactionsList(pagination),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
    },
  )
}
