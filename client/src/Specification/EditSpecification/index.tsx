import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import SpecificationForm from '../SpecificationForm'

const EditSpecification: React.SFC = () => {
  const [currentSpecification, setCurrentSpecification] = useState({ name: '' })
  let history = useHistory()
  const params: { id: string } = useParams();
  const id = params.id

  useEffect(() => {
    const getSpecificationItem = async () => {
    const response: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications/${id}`)
    
    setCurrentSpecification({ name: response.data.name })
    }
    getSpecificationItem()
  }, [id])

  const onSubmit = async (values: { name: string }, { setSubmitting }: any) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/specifications/${id}`, {
        name: values.name,
      })
      history.push(`/specifications`)
    } catch(error) {
      history.push(`/specifications/${id}/`)
    }
  }

  return(
    <>
      <h1>仕様書作成</h1>
      <SpecificationForm onSubmit={onSubmit} initialValues={currentSpecification}/>
    </>
  )
}

export default EditSpecification
