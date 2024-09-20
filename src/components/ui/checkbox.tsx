import React from 'react'

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return <input type="checkbox" ref={ref} {...props} className="form-checkbox h-4 w-4 text-blue-600" />
  }
)

Checkbox.displayName = 'Checkbox'