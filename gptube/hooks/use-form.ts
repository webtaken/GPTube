import { useState } from 'react'

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)

  const handleChange = ({ name, value }: { name: keyof T; value: T[keyof T] }) => {
    setValues({
      ...values,
      [name]: value,
    })
  }

  return {
    ...values,
    handleChange,
  }
}
