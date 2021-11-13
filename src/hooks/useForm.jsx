import { useState } from 'react'

const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit?.(formData)
    setLoading(false)
  }

  const handleReset = () => {
    setFormData(initialState)
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handleReset,
    setFormData,
    loading,
  }
}

export default useForm
