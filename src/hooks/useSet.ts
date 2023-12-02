import { useState } from 'react'

export const useSet = <T>() => {
  const [values, setValues] = useState(new Set<T>([]))

  const addValue = (value: T) => {
    setValues(prev => new Set(prev).add(value))
  }

  const delValue = (value: T) => {
    setValues(prev => {
      const newSet = new Set(prev)
      newSet.delete(value)
      return newSet
    })
  }

  return { values, addValue, delValue }
}
