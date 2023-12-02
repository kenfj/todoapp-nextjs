'use client'

import { toast } from 'react-hot-toast'

export const showSuccess = (message: string) => {
  console.info(message)
  toast.success(message)
}

export const showError = (message: string) => {
  console.error(message)
  toast.error(message)
}
