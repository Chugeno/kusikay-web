import React from 'react'

interface ProgressProps {
  value: number
  className?: string
}

export function Progress({ value, className = '' }: ProgressProps) {
  return (
    <div className={`w-full bg-[#E5C1B9] rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-[#853C29] h-2.5 rounded-full transition-all duration-300 ease-in-out" 
        style={{ width: `${value}%` }}
      />
    </div>
  )
}