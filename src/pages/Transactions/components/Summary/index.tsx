import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useSummary } from '../../../../hooks/useSummary'
import { priceFormatter } from '../../../../utils/formatter'

import styles from './styles'

const { DivWrapper, DivSummaryCard } = styles

export const SummaryComponent = () => {
  const summary = useSummary()

  return (
    <DivWrapper>
      <DivSummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </DivSummaryCard>

      <DivSummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>-{priceFormatter.format(summary.outcome)}</strong>
      </DivSummaryCard>

      <DivSummaryCard colorProp="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </DivSummaryCard>
    </DivWrapper>
  )
}
