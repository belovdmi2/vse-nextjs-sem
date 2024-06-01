'use client'
import { createCar } from '@/utils/actions'
import { Brand, CarModel } from '@prisma/client'
import BrandAndModelFormFields from './BrandAndModelFormFields'
import { useForm } from 'react-hook-form'
import TextInput from './commons/inputs/TextInput'
import { useState } from 'react'

export type CreateCarFormData = {
  modelId: string
  brandId: string
  price: number
  location: string
  description: string
}

const NewCarForm = ({
  models,
  brands,
}: {
  models: CarModel[]
  brands: Brand[]
}) => {
  const { register, watch, setValue, reset } = useForm<CreateCarFormData>()
  const choosenBrand = watch('brandId')

  return (
    <div className="max-w-96 m-auto">
      <form className="flex flex-col gap-5" action={createCar}>
        <BrandAndModelFormFields
          models={models}
          brands={brands}
          choosenBrand={choosenBrand}
          register={register}
          resetModel={() => {
            setValue('modelId', '')
          }}
          fullWidth
          required
        />
        <TextInput
          label="Description"
          name="description"
          register={register}
          fullWidth
        />
        <TextInput
          label="Location"
          name="location"
          register={register}
          fullWidth
        />
        <TextInput
          label="Price"
          type="number"
          name="price"
          register={register}
          fullWidth
          required
        />
        <TextInput label="Color" name="color" register={register} fullWidth />
        <TextInput
          label="Year of manufacture"
          name="year"
          register={register}
          fullWidth
          type="number"
          min="1900"
          max="2099"
        />
        <button
          type="submit"
          className="w-full bg-rose-950/50 font-semibold text-rose-50 transition duration-300 ease-in-ou p-1 rounded-md hover:bg-rose-950/70 hover:backdrop-blur-lg text-center"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default NewCarForm
