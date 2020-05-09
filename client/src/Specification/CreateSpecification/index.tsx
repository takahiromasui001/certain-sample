import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import SpecificationForm from '../SpecificationForm'

const CreateSpecification: React.SFC = () => {
  let history = useHistory()

  const onSubmit = async (values: { name: string }, { setSubmitting }: any) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/specifications`, {
        name: values.name,
      })
      history.push(`/specifications`)
    } catch(error) {
      history.push(`/specifications/new`)
    }
  }

  return(
    <>
      <h1>仕様書作成</h1>
      <SpecificationForm onSubmit={onSubmit}/>
    </>
  )
}

export default CreateSpecification
