import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'outline'
  fullWidth?: boolean
  startIcon?: ReactNode
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  startIcon,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`cms-button cms-button--${variant}${fullWidth ? ' cms-button--full' : ''} ${className}`.trim()}
      {...props}
    >
      {startIcon ? <span className="cms-button__icon">{startIcon}</span> : null}
      {children}
    </button>
  )
}
