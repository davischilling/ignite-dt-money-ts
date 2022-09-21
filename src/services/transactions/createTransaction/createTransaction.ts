import { api } from '../../global/axios'
import { PostTransaction } from './types'

export const createTransaction = async (transaction: PostTransaction) =>
  api
    .post<PostTransaction>('transactions', transaction)
    .then((response) => response.data)
