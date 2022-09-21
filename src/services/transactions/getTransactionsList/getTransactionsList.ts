import { api } from '../../global/axios'
import { Transaction } from './types'

export const getTransactionsList = async (query?: string) =>
  api
    .get<Transaction[]>('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    .then((response) => response.data)
