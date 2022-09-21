import { queryClient } from './../../../App'
import { getTransaction } from './getTransaction'
import { getTransactionKey } from './key'

export const useGetPrefetchedTransaction = (
  id: string,
  // options?: UseQueryOptions<Transaction[]>,
) => {
  return queryClient.prefetchQuery(
    getTransactionKey(id),
    async () => getTransaction(id),
    {
      staleTime: 1000 * 60 * 10, // 10 minutos
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
    },
  )
}
