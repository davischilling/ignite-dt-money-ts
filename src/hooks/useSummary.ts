import { useMemo } from 'react'
import { useGetTransactionsList } from '../services/transactions'
// import { useContextSelector } from 'use-context-selector'
// import { TransactionsContext } from './../contexts/TransactionsContext'

export const useSummary = () => {
  // const transactions = useContextSelector(TransactionsContext, (context) => {
  //   return context.transactions
  // })

  const { data: transactions } = useGetTransactionsList({})

  const summary = useMemo(
    () =>
      transactions &&
      transactions.reduce(
        (previous, transaction) => {
          if (transaction.type === 'income') {
            previous.income += transaction.price
            previous.total += transaction.price
          } else {
            previous.outcome += transaction.price
            previous.total -= transaction.price
          }
          return previous
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      ),
    [transactions],
  )
  return summary
}
