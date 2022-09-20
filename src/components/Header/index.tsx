import styles from './styles'
import logoImg from '../../assets/Logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModalComponent } from '../NewTransactionModal'

const { DivWrapper, DivContent, ButtonNewTransaction } = styles

export const HeaderComponent = () => {
  return (
    <DivWrapper>
      <DivContent>
        <img src={logoImg} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ButtonNewTransaction>Nova transação</ButtonNewTransaction>
          </Dialog.Trigger>
          <NewTransactionModalComponent />
        </Dialog.Root>
      </DivContent>
    </DivWrapper>
  )
}
