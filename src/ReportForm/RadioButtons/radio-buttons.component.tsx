import React, { useEffect, useRef, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

export interface IRadioButtonOption {
  id: string
  label: string
  isSelected: boolean
}

interface IRadioButtonsProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  options: IRadioButtonOption[]
}

type IRadioButtonValue = Omit<IRadioButtonOption, 'label'> 

export const RadioButtons = ({ name, options, ...rest }: IRadioButtonsProps) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { fieldName, registerField, defaultValue } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]): IRadioButtonValue[] => {
        return refs.map(ref => ({ id: ref.id, isSelected: ref.checked }))
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false
        })
      },
      setValue: (refs: HTMLInputElement[], values) => {
        refs.forEach(ref => {
          if (values.some(value => value.id === ref.id)) {
            ref.checked = true
          }
        })
      },
    })
  }, [defaultValue, fieldName, registerField])

  return (
    <div>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            defaultChecked={defaultValue === option.id}
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement
            }}
            value={option.id}
            type="radio"
            id={option.id}
            name={fieldName}
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}