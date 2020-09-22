import React, { useRef, useEffect, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const Input = ({ name, ...rest }: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />
}