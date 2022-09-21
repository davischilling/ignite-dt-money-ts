import { useContextSelector } from 'use-context-selector'

import { HeaderComponent, SpinnerComponent } from '../../components'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchFormComponent, SummaryComponent } from './components'
import styles from './styles'

const { DivTransactions, Table, SpanPrice } = styles

export const TransactionsPage = () => {
  const { transactions, handlePrefetchTransaction } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        transactions: context.transactions,
        handlePrefetchTransaction: context.handlePrefetchTransaction,
      }
    },
  )

  return (
    <div>
      <HeaderComponent />
      <SummaryComponent />

      <DivTransactions>
        <SearchFormComponent />
        <Table>
          <tbody>
            {!transactions ? (
              <SpinnerComponent />
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td
                    width="40%"
                    onMouseEnter={() =>
                      handlePrefetchTransaction(String(transaction.id))
                    }
                  >
                    {transaction.description}
                  </td>
                  <td width="20%">
                    <SpanPrice type={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </SpanPrice>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </DivTransactions>
    </div>
  )
}
