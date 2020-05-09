import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import ProductForm from '../../components/ProductForm'
import PageTitle from 'src/shared/components/PageTitle'

const EditProduct: React.SFC = () => {
  const [currentProduct, setCurrentProduct] = useState({ name: '', maker: '', price: '' })
  let history = useHistory()
  const params: { id: string } = useParams();
  const id = params.id

  useEffect(() => {
    const getProduct = async () => {
      const response: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/products/${id}`)
      
      setCurrentProduct({ name: response.data.name, maker: response.data.maker, price: response.data.price })
    }
    getProduct()
  }, [id])

  const onSubmit = async (values: { name: string, maker: string, price: number }, { setSubmitting }: any) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/products/${id}`, {
        name: values.name,
        maker: values.maker,
        price: values.price
      })
      history.push('/products')
    } catch(error) {
      history.push('/products/new')
    }
  }

  return(
    <>
      <PageTitle>商品編集</PageTitle>
      <ProductForm onSubmit={onSubmit} initialValues={currentProduct}/>
    </>
  )
}

export default EditProduct
