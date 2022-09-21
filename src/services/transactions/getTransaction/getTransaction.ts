import { api } from '../../global/axios'
import { Transaction } from './types'

export const getTransaction = async (id: string) =>
  api.get<Transaction>(`transactions/${id}`).then((response) => response.data)
