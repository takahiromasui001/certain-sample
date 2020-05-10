import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import SpecificationItemForm from '../../components/SpecificationItemForm'
import PageTitle from 'src/shared/components/PageTitle'
import useProductList from '../../hooks/useProductList'

const CreateSpecificationItem: React.SFC = () => {
  let history = useHistory()
  const params: { id: string } = useParams()
  const id = params.id

  const products = useProductList()
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

  const onCancel = () => {
    history.push('/products')
  }

  return(
    <>
      <PageTitle>仕様書項目作成</PageTitle>
      <SpecificationItemForm onSubmit={onSubmit} onCancel={onCancel} products={products}/>
    </>
  )
}

export default CreateSpecificationItem
