import React, { useRef, useEffect } from "react"

import {Form} from '@unform/web'
import { SubmitHandler, Scope, FormHandles } from "@unform/core"
import { Input } from "./Input/input.component"
import { RadioButtons, IRadioButtonOption } from "./RadioButtons/radio-buttons.component"

export const ReportForm = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler = (
    data,
    helpers,
    event,
  ) => {
    console.log(data)
  }

  const choiceOptions: IRadioButtonOption[] = [
    {
      id: '1',
      label: 'Sim',
      isSelected: false
    },
    {
      id: '2',
      label: 'Não',
      isSelected: true
    }
  ]

  useEffect(() => {
    formRef.current?.setData({
      steps: [
        {
          texts: [
            {
              id: '1',
              text: 'Forma correta de adicionar dados de uma requisição no formulário'
            }
          ]
        },
        {
          choices: [
            {
              id: '1',
              options: choiceOptions,
            }
          ]
        }
      ]
    })
  }, [choiceOptions])

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Scope path="steps[0]">
        <Scope path="texts[0]">
          <Input name="id" style={{ display: 'none' }} />

          <Input
            name="value"
            type="textarea"
            placeholder="Observação"
          />
        </Scope>
      </Scope>

      <Scope path="steps[1]">
        <Scope path="choices[0]">
          <Input name="id" style={{ display: 'none' }} />

          <RadioButtons name="options" options={choiceOptions}/>
        </Scope>
      </Scope>

      <button type="submit">
        Enviar
      </button>
    </Form>
  )
}