import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import SpecificationItemForm from '../SpecificationItemForm'

const CreateSpecificationItem: React.SFC = () => {
  let history = useHistory()
  const params: { id: string } = useParams()
  const id = params.id

  const onSubmit = async (values: { name: string, type: number, productId: number, specificationId: number }, { setSubmitting }: any) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/specification_items`, {
        name: values.name,
        type: values.type,
        productId: values.productId,
        specificationId: id,
      })
      history.push(`/specifications/${id}/specification_items`)
    } catch(error) {
      history.push(`/specifications/${id}/specification_items/new`)
    }
  }

  return(
    <SpecificationItemForm onSubmit={onSubmit}/>
  )
}

export default CreateSpecificationItem
