import React from 'react'

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  return <label {...props} className={`block text-sm font-medium text-gray-700 ${props.className}`} />
}

// Nuevo componente para los títulos del formulario
export const FormTitleLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  return <label {...props} className={`block text-lg font-bold text-kusikay-accent ${props.className}`} />
}