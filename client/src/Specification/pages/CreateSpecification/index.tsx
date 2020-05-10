import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import SpecificationForm from '../../components/SpecificationForm'
import PageTitle from 'src/shared/components/PageTitle'

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

  const onCancel = () => {
    history.push('/products')
  }

  return(
    <>
      <PageTitle>仕様書作成</PageTitle>
      <SpecificationForm onSubmit={onSubmit} onCancel={onCancel}/>
    </>
  )
}

export default CreateSpecification
