import { useMutation } from 'react-query'

import { createTransaction } from './createTransaction'
import { queryClient } from './../../../App'
import { PostTransaction } from './types'

export const useCreateTransaction = () => {
  return useMutation(
    (transaction: PostTransaction) => createTransaction(transaction),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('transactions')
      },
    },
  )
}
