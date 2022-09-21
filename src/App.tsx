import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'

import { TransactionsProvider } from './contexts/TransactionsContext'
import { TransactionsPage } from './pages/Transactions'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export const queryClient = new QueryClient()

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <TransactionsProvider>
          <TransactionsPage />
        </TransactionsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
