import { Brand, CarModel } from '@prisma/client'
import SelectInput from './commons/inputs/SelectInput'
import TextInput from './commons/inputs/TextInput'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'

type CarSearchFormProps = {
  models?: CarModel[]
  brands?: Brand[]
  disableSubmit: boolean
  processDataAfterSubmit: (data: SearchCarsFormData) => void
}

export type SearchCarsFormData = {
  location: string
  model: string
  brand: string
}

const CarSearchForm = ({
  models,
  brands,
  disableSubmit,
  processDataAfterSubmit,
}: CarSearchFormProps) => {
  const { register, handleSubmit, watch, setValue } =
    useForm<SearchCarsFormData>()
  const choosenBranch = watch('brand')

  const onSubmit = (data: SearchCarsFormData) => {
    // TODO: preserve data in sessoin storage
    processDataAfterSubmit(data)
  }

  const filteredModels = useMemo(() => {
    if (brands && models) {
      const id = brands.find((brand) => brand.name === choosenBranch)?.id || -1
      if (id !== -1) {
        setValue('model', '')
      }
      return models.filter((model) => (id === -1 ? true : model.brandId === id))
    }

    return []
  }, [models, choosenBranch, brands, setValue])

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
          <SelectInput
            label="Brand"
            name="brand"
            register={register}
            options={[
              { value: '', label: '' },
              ...brands.map((brand) => ({
                label: brand.name,
                value: brand.name,
              })),
            ]}
          />
          <SelectInput
            label="Model"
            name="model"
            register={register}
            options={[
              { value: '', label: '' },
              ...filteredModels.map((model) => ({
                label: model.name,
                value: model.name,
              })),
            ]}
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
