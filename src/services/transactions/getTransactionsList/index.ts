import { useQuery } from 'react-query'
import { getTransactionsList } from './getTransactionsList'
import { getTransactionsListKey } from './key'

export const useGetTransactionsList = (
  query?: string,
  // options?: UseQueryOptions<Transaction[]>,
) => {
  return useQuery(
    getTransactionsListKey(query),
    () => getTransactionsList(query),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
    },
  )
}
