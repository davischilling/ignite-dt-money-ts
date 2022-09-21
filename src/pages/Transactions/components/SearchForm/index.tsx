import { MagnifyingGlass } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { memo } from 'react'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { SearchFormInputs, useFormValidations } from './validations'

import styles from './styles'
const { FormWrapper } = styles

const MemoizedSearchFormComponent = () => {
  const { fetchTransactions, pagination } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        fetchTransactions: context.fetchTransactions,
        pagination: context.pagination,
      }
    },
  )

  const { register, handleSubmit, isSubmitting } = useFormValidations()

  const handleSearchFormSubmit = async (data: SearchFormInputs) => {
    await fetchTransactions({
      ...pagination,
      query: data.query,
    })
  }

  return (
    <FormWrapper onSubmit={handleSubmit(handleSearchFormSubmit)}>
      <input
        type="text"
        placeholder="Burque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </FormWrapper>
  )
}

export const SearchFormComponent = memo(MemoizedSearchFormComponent)
