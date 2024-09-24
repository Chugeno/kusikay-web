import React from 'react'

// Componente Textarea
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => {
    return (
      <textarea 
        ref={ref} 
        {...props} 
        className={`w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6200EE] focus:border-transparent transition-all duration-300 ease-in-out ${props.className}`} 
      />
    )
  }
)

Textarea.displayName = 'Textarea'

// Componente Input
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input 
        ref={ref} 
        {...props} 
        className={`w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6200EE] focus:border-transparent transition-all duration-300 ease-in-out ${props.className}`} 
      />
    )
  }
)

Input.displayName = 'Input'