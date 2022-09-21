import { render, waitFor } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { App } from './App'

describe('App Component', () => {
  it('should render cards', async () => {
    const { getByText } = render(<App />)

    expect(getByText('Entradas')).toBeInTheDocument()
    expect(getByText('Saídas')).toBeInTheDocument()
    expect(getByText('Total')).toBeInTheDocument()
  })

  it('Should be able to create a new transaction', async () => {
    const {
      findByTestId,
      getByText,
      queryByText,
      // getByPlaceholderText,
      // findByText,
      // debug,
    } = render(<App />)

    await waitFor(async () => {
      await findByTestId('transactions-table')
    })

    // const newTransactionBtn = await findByText('Nova transação')
    // userEvent.click(newTransactionBtn)

    // debug()

    // const descriptionInput = getByPlaceholderText('Descrição')
    // const priceInput = getByPlaceholderText('Preço')
    // const categoryInput = getByPlaceholderText('Categoria')

    // userEvent.type(descriptionInput, 'descricao')
    // userEvent.type(priceInput, '1000')
    // userEvent.type(categoryInput, 'categoria')

    // const registerBtn = getByText('Cadastrar')
    // userEvent.click(registerBtn)

    await waitFor(() => {
      expect(getByText('salario')).toBeInTheDocument()
      expect(queryByText('ignite')).not.toBeInTheDocument()
    })
  })
})
