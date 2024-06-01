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
  const [loading, setLoading] = useState<boolean>(false)

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      return (await fetch('/api/brands')).json()
    },
  })

  const { data: models } = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      return (await fetch('/api/car-models')).json()
    },
  })

  const { data: cars } = useQuery({
    queryKey: ['cars', { location, model, brand }],
    queryFn: async () => {
      setLoading(true)
      try {
        return (
          await fetch(
            `/api/cars?location=${location ?? ''}&modelId=${
              model ?? ''
            }&brandId=${brand ?? ''}`
          )
        ).json()
      } finally {
        setLoading(false)
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: 'always',
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

  if (!cars || !models || !brands) {
    return <Loading />
  }

  return (
    <div className="pt-8">
      <CarSearchForm
        models={models?.data}
        brands={brands?.data}
        processDataAfterSubmit={setFilter}
        disableSubmit={loading}
      />
      <div className="flex justify-between p-4">
        <div className="w-44 text-left">Model</div>
        <div className="w-24">Year</div>

        <div className="w-40 inline-block">Price</div>
      </div>
      <hr />
      {loading ? <Loading /> : <CarList cars={cars?.data} />}
    </div>
  )
}

export default HomePage
