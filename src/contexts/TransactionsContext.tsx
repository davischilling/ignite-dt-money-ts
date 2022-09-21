import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'
import {
  useGetTransactionsList,
  useCreateTransaction,
  useGetPrefetchedTransaction,
} from '../services/transactions'
import { PostTransaction } from '../services/transactions/createTransaction/types'

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
  fetchTransactions: (query?: string) => Promise<void>
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

  const [query, setQuery] = useState('')

  const { data: transactions, refetch } = useGetTransactionsList(query)
  const { mutateAsync } = useCreateTransaction()

  const fetchTransactions = async (q?: string) => {
    setQuery(q || '')
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
        fetchTransactions,
        createNewTransaction,
        handlePrefetchTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
