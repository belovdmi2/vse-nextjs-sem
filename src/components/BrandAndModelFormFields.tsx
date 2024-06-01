'use client'
import { Brand, CarModel } from '@prisma/client'
import { Fragment, useMemo } from 'react'
import { UseFormRegister } from 'react-hook-form'
import SelectInput from './commons/inputs/SelectInput'

const BrandAndModelFormFields = ({
  models,
  brands,
  register,
  choosenBrand,
  resetModel,
  fullWidth,
  required,
}: {
  models: CarModel[]
  brands: Brand[]
  register: UseFormRegister<any>
  choosenBrand: string
  resetModel: () => void
  fullWidth?: boolean
  required?: boolean
}) => {
  const filteredModels = useMemo(() => {
    if (brands && models) {
      if (choosenBrand) {
        resetModel()
      }
      return models.filter((model) =>
        !choosenBrand ? true : model.brandId === choosenBrand
      )
    }

    return []
  }, [models, choosenBrand, brands, resetModel])

  return (
    <Fragment>
      <SelectInput
        label="Brand"
        name="brandId"
        register={register}
        options={[
          { value: '', label: '' },
          ...brands.map((brand) => ({
            label: brand.name,
            value: brand.id,
          })),
        ]}
        fullWidth={fullWidth}
        required={required}
      />
      <SelectInput
        label="Model"
        name="modelId"
        register={register}
        options={[
          { value: '', label: '' },
          ...filteredModels.map((model) => ({
            label: model.name,
            value: model.id,
          })),
        ]}
        fullWidth={fullWidth}
        required={required}
      />
    </Fragment>
  )
}

export default BrandAndModelFormFields
