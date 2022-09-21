import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'
import {
  useCreateTransaction,
  useGetPrefetchedTransaction,
  useGetTransactionsList,
} from '../services/transactions'
import { PostTransaction } from '../services/transactions/createTransaction/types'
import { Pagination } from '../services/transactions/getTransactionsList/types'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

type NewTransactionFormData = {
  type: 'income' | 'outcome'
  description: string
  price: number
  category: string
}

interface TransactionsContextType {
  transactions: Transaction[] | undefined
  pagination: Pagination
  fetchTransactions: (pagination: Pagination) => Promise<void>
  createNewTransaction: (data: NewTransactionFormData) => Promise<void>
  handlePrefetchTransaction: (id: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  // const [transactions, setTransactions] = useState<Transaction[]>([])

  // const fetchTransactions = useCallback(async (query?: string) => {
  //   const response = await api.get('transactions', {
  // params: {
  //   _sort: 'createdAt',
  //   _order: 'desc',
  //   q: query,
  // },
  //   })
  //   setTransactions(response.data)
  // }, [])

  // useEffect(() => {
  //   fetchTransactions()
  // }, [fetchTransactions])

  // const createNewTransaction = useCallback(
  //   async (data: NewTransactionFormData) => {
  //     const response = await api.post('transactions', {
  //       ...data,
  //       createdAt: new Date(),
  //     })
  //     setTransactions((state) => [response.data, ...state])
  //   },
  //   [],
  // )

  const [pagination, setPagination] = useState<Pagination>({
    query: '',
    page: 1,
    limit: 5,
  })

  const { data: transactions, refetch } = useGetTransactionsList(pagination)

  const { mutateAsync } = useCreateTransaction()

  const fetchTransactions = async ({ query, page, limit }: Pagination) => {
    setPagination({ query, page, limit })
  }

  const createNewTransaction = async (data: NewTransactionFormData) => {
    const newTransaction: PostTransaction = {
      ...data,
      createdAt: String(new Date()),
    }
    await mutateAsync(newTransaction)
    refetch()
  }

  const handlePrefetchTransaction = async (TransactionId: string) => {
    await useGetPrefetchedTransaction(TransactionId)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        pagination,
        fetchTransactions,
        createNewTransaction,
        handlePrefetchTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
