import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ProductForm from '../ProductForm'

const CreateProduct: React.SFC = () => {
  let history = useHistory()
  const onSubmit = async (values: { name: string, maker: string, price: number }, { setSubmitting }: any) => {
    try {
      await axios.post('http://localhost:3000/api/v1/products', {
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
      <h1>商品作成</h1>
      <ProductForm onSubmit={onSubmit}/>
    </>
  )
}

export default CreateProduct
