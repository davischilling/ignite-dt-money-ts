import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'

import { TransactionsContext } from '../../contexts/TransactionsContext'
import { NewTransactionFormInputs, useFormValidations } from './validations'

import styles from './styles'

const {
  Overlay,
  Content,
  Close,
  DivTransactionTypeWrapper,
  ButtonTransactionType,
} = styles

export const NewTransactionModalComponent = () => {
  const createNewTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createNewTransaction
    },
  )
  const { register, handleSubmit, isSubmitting, control, Controller, reset } =
    useFormValidations()

  const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
    createNewTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <Close>
          <X />
        </Close>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <DivTransactionTypeWrapper
                onValueChange={field.onChange}
                value={field.value}
              >
                <ButtonTransactionType transactionType="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </ButtonTransactionType>
                <ButtonTransactionType
                  transactionType="outcome"
                  value="outcome"
                >
                  <ArrowCircleDown size={24} />
                  Saída
                </ButtonTransactionType>
              </DivTransactionTypeWrapper>
            )}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
