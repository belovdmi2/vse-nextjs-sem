interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

const TextInput = (props: TextInputProps) => {
  const { label, name, ...rest } = props
  return (
    <div className="flex flex-col">
      {label ?? <label htmlFor={name}>{label}</label>}
      <input name={name} {...rest} className="form-field" />
    </div>
  )
}

export default TextInput
