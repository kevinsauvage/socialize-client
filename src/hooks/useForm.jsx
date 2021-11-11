import { useState } from 'react'

const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit?.(formData)
  }

  const handleReset = () => {
    setFormData(initialState)
  }

  return { formData, handleInputChange, handleSubmit, handleReset, setFormData }
}

export default useForm
