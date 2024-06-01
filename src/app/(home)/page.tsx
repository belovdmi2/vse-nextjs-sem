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
            `/api/cars?location=${location ?? ''}&model=${model ?? ''}&brand=${
              brand ?? ''
            }`
          )
        ).json()
      } finally {
        setLoading(false)
      }
    },
    placeholderData: keepPreviousData,
  })

  const setFilter = async ({ location, model, brand }: SearchCarsFormData) => {
    setLocation(location)
    setModel(model)
    setBrand(brand)
  }

  if (!cars || !models || !brands) {
    return <Loading />
  }

  return (
    <div>
      <CarSearchForm
        models={models?.data}
        brands={brands?.data}
        processDataAfterSubmit={setFilter}
        disableSubmit={loading}
      />
      {loading ? <Loading /> : <CarList cars={cars?.data} />}
    </div>
  )
}

export default HomePage
