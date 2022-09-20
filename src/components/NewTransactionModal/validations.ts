import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const newTransactionFormchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

export type NewTransactionFormInputs = z.infer<typeof newTransactionFormchema>

export const useFormValidations = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormchema),
    defaultValues: {
      type: 'income',
    },
  })

  return { register, handleSubmit, isSubmitting, control, Controller, reset }
}
