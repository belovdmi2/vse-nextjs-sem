'use client'

import CarList from '@/components/CarList'
import CarSearchForm, { SearchCarsFormData } from '@/components/CarSearchForm'
import Loading from '@/components/commons/Loading'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'

const HomePage = () => {
  const [model, setModel] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [location, setLocation] = useState<string>('')

  const { data: brands, isFetching: isBrandsFetching } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      return (await fetch('/api/brands')).json()
    },
    throwOnError: true,
  })

  const { data: models, isFetching: isModelsFetching } = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      return (await fetch('/api/car-models')).json()
    },
    throwOnError: true,
  })

  const { data: cars, isFetching: isCarsFetching } = useQuery({
    queryKey: ['cars', { location, model, brand }],
    queryFn: async () => {
      return (
        await fetch(
          `/api/cars?location=${location ?? ''}&modelId=${
            model ?? ''
          }&brandId=${brand ?? ''}`
        )
      ).json()
    },
    placeholderData: keepPreviousData,
    refetchOnMount: 'always',
    throwOnError: true,
  })

  const setFilter = async ({
    location,
    modelId,
    brandId,
  }: SearchCarsFormData) => {
    setLocation(location)
    setModel(modelId)
    setBrand(brandId)
  }

  if (isCarsFetching || isModelsFetching || isBrandsFetching) {
    return <Loading />
  }

  return (
    <div className="pt-8">
      <CarSearchForm
        models={models?.data}
        brands={brands?.data}
        processDataAfterSubmit={setFilter}
        disableSubmit={isModelsFetching || isBrandsFetching || isCarsFetching}
      />
      <div className="flex justify-between p-4">
        <div className="w-44 text-left">Model</div>
        <div className="w-24">Year</div>

        <div className="w-40 inline-block">Price</div>
      </div>
      <hr />
      {isCarsFetching ? <Loading /> : <CarList cars={cars?.data} />}
    </div>
  )
}

export default HomePage
