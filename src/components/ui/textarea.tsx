import React from 'react'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => {
    return <textarea ref={ref} {...props} className="w-full p-2 border border-gray-300 rounded-md" />
  }
)

Textarea.displayName = 'Textarea'