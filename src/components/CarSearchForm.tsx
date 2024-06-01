import { Brand, CarModel } from '@prisma/client'
import TextInput from './commons/inputs/TextInput'
import { useForm } from 'react-hook-form'
import BrandAndModelFormFields from './BrandAndModelFormFields'

type CarSearchFormProps = {
  models?: CarModel[]
  brands?: Brand[]
  disableSubmit: boolean
  processDataAfterSubmit: (data: SearchCarsFormData) => void
}

export type SearchCarsFormData = {
  location: string
  modelId: string
  brandId: string
}

const CarSearchForm = ({
  models,
  brands,
  disableSubmit,
  processDataAfterSubmit,
}: CarSearchFormProps) => {
  const { register, handleSubmit, watch, setValue } =
    useForm<SearchCarsFormData>()

  const choosenBrand = watch('brandId')

  const onSubmit = (data: SearchCarsFormData) => {
    processDataAfterSubmit(data)
  }

  if (!models || !brands) {
    return null
  }

  return (
    <>
      <form
        className="flex justify-between gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
          <TextInput label="Location" name={'location'} register={register} />
          <BrandAndModelFormFields
            models={models}
            brands={brands}
            choosenBrand={choosenBrand}
            register={register}
            resetModel={() => {
              setValue('modelId', '')
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-rose-950/50 font-semibold text-rose-50 transition duration-300 ease-in-ou p-1 rounded-md hover:bg-rose-950/70 hover:backdrop-blur-lg  w-24 text-center"
          disabled={disableSubmit}
        >
          Search
        </button>
      </form>
    </>
  )
}

export default CarSearchForm
