import React, { SelectHTMLAttributes } from 'react'

import './styles.css'

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: {
    value: string
    label: string
  }[]
}

const Select: React.FC<ISelect> = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option disabled hidden>Selecione uma opção</option>

        { options.map(option => {
          return <option
            key={option.value}
            value={option.value}
          >{option.label}</option>
        }) }
      </select>
    </div>
  )
}

export default Select
