import { api } from '../../global/axios'
import { Pagination, Transaction } from './types'

export const getTransactionsList = async ({ query, page, limit }: Pagination) =>
  api
    .get<Transaction[]>('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
        _page: page,
        _limit: limit,
      },
    })
    .then((response) => response.data)
