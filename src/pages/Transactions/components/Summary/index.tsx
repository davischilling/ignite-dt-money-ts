import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { SpinnerComponent } from '../../../../components'
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

        {summary ? (
          <strong>{priceFormatter.format(summary.income)}</strong>
        ) : (
          <SpinnerComponent />
        )}
      </DivSummaryCard>

      <DivSummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        {summary ? (
          <strong>-{priceFormatter.format(summary.outcome)}</strong>
        ) : (
          <SpinnerComponent />
        )}
      </DivSummaryCard>

      <DivSummaryCard colorProp="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        {summary ? (
          <strong>{priceFormatter.format(summary.total)}</strong>
        ) : (
          <SpinnerComponent />
        )}
      </DivSummaryCard>
    </DivWrapper>
  )
}
