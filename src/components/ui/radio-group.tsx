import React from 'react'
import { Label } from './label'

interface RadioGroupProps {
  children: React.ReactNode
  onValueChange: (value: string) => void
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ children, onValueChange }) => {
  return (
    <div onChange={(e: React.ChangeEvent<HTMLInputElement>) => onValueChange(e.target.value)}>
      {children}
    </div>
  )
}

interface RadioGroupItemProps {
  value: string
  id: string
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id }) => {
  return (
    <input type="radio" value={value} id={id} name="radio-group" />
  )
}