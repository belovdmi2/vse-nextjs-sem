import { UseFormRegister } from 'react-hook-form'

type Option = {
  value: string
  label: string
}

interface SelectInputProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: Option[]
  register: UseFormRegister<any>
}

const SelectInput = (props: SelectInputProps) => {
  const { label, name, options, register, ...rest } = props

  return (
    <div className="flex flex-col w-44">
      {label ?? <label htmlFor={name}>{label}</label>}
      <select
        {...rest}
        {...register(name)}
        className="form-field bg-white/50 border-b-2 border-rose-800 p-1 rounded-md h-8"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
