import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ProductForm from '../../components/ProductForm'
import PageTitle from 'src/shared/components/PageTitle'

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

  const onCancel = () => {
    history.push('/products')
  }

  return(
    <>
      <PageTitle>商品作成</PageTitle>
      <ProductForm onSubmit={onSubmit} onCancel={onCancel}/>
    </>
  )
}

export default CreateProduct
