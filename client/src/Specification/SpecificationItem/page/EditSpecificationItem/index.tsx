import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import SpecificationItemForm from '../../components/SpecificationItemForm'
import PageTitle from 'src/shared/PageTitle'

const EditSpecificationItem: React.SFC = () => {
  const [currentSpecificationItem, setCurrentSpecificationItem] = useState({ name: '', type: '', productId: '' })
  let history = useHistory()
  const params: { id: string, specificationItemId: string } = useParams();
  const id = params.specificationItemId

  useEffect(() => {
    const getSpecificationItem = async () => {
    const response: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specification_items/${id}`)
    console.log(response.data)
    
    setCurrentSpecificationItem({ name: response.data.name, type: response.data.specification_type, productId: response.data.product_id })
    }
    getSpecificationItem()
  }, [id])

  const onSubmit = async (values: { name: string, type: number, productId: number, specificationId: number }, { setSubmitting }: any) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/specification_items/${id}`, {
        name: values.name,
        type: values.type,
        productId: values.productId,
        specificationId: id,
      })
      history.push(`/specifications/${params.id}/specification_items`)
    } catch(error) {
      history.push(`/specifications/${params.id}/specification_items/${id}`)
    }
  }

  return(
    <>
      <PageTitle>仕様書項目編集</PageTitle>
      <SpecificationItemForm onSubmit={onSubmit} initialValues={currentSpecificationItem}/>
    </>
  )
}

export default EditSpecificationItem
