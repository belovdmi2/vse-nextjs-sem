const LabeledValue = ({
  label,
  children,
}: Readonly<{
  label: string
  children: React.ReactNode
}>) => {
  return (
    <div className="flex justify-center">
      <div className="w-64 font-semibold">{label}:</div>{' '}
      <div className="w-64">{children ?? '-'}</div>
    </div>
  )
}

export default LabeledValue
