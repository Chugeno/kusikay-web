import React from 'react'

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button {...props} className="bg-kusikay-accent text-white rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1" />
}