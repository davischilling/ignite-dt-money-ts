import { useContextSelector } from 'use-context-selector'

import { HeaderComponent } from '../../components'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchFormComponent, SummaryComponent } from './components'
import styles from './styles'

const { DivTransactions, Table, SpanPrice } = styles

export const TransactionsPage = () => {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <HeaderComponent />
      <SummaryComponent />

      <DivTransactions>
        <SearchFormComponent />
        <Table>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="40%">{transaction.description}</td>
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
              ))}
          </tbody>
        </Table>
      </DivTransactions>
    </div>
  )
}
