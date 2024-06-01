import { UseFormRegister } from 'react-hook-form'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  register: UseFormRegister<any>
}

const TextInput = (props: TextInputProps) => {
  const { label, name, register, ...rest } = props
  return (
    <div className="flex flex-col w-44">
      {label ?? <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        {...register(name)}
        className="form-field bg-white/50 border-b-2 border-rose-800 p-1 rounded-md h-8"
      />
    </div>
  )
}

export default TextInput
