import React from 'react'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return <input ref={ref} {...props} className="w-full p-2 border border-gray-300 rounded-md" />
  }
)

Input.displayName = 'Input'