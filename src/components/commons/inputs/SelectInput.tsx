type Option = {
  value: string
  label: string
}

interface SelectInputProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: Option[]
}

const SelectInput = (props: SelectInputProps) => {
  const { label, name, options, ...rest } = props

  return (
    <div className="flex flex-col">
      {label ?? <label htmlFor={name}>{label}</label>}
      <select name={name} {...rest} className="form-field">
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
