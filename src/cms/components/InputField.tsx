import type { ChangeEvent, HTMLInputTypeAttribute } from 'react'

type InputFieldProps = {
  id?: string
  name?: string
  type?: HTMLInputTypeAttribute
  autoComplete?: string
  placeholder?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  minLength?: number
  error?: boolean
  hint?: string
}

export function InputField({
  id,
  name,
  type = 'text',
  autoComplete,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  minLength,
  error = false,
  hint,
}: InputFieldProps) {
  return (
    <div className="cms-input-wrap">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        minLength={minLength}
        aria-invalid={error || undefined}
        aria-describedby={hint && id ? `${id}-hint` : undefined}
        className={`cms-input${error ? ' cms-input--error' : ''}`}
      />
      {hint ? (
        <p id={id ? `${id}-hint` : undefined} className={`cms-input-hint${error ? ' cms-input-hint--error' : ''}`}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
