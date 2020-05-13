import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouteMatch, useHistory } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import ProductTable from '../../components/ProductTable'

export interface IProduct {
  id: number
  name: string
  maker: string
  price: number
}

const ProductList: React.SFC = () => {
  const [products, setProducts] : any = useState([])
  let match = useRouteMatch()
  let history = useHistory()

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get('http://localhost:3000/api/v1/products')
      setProducts(result.data)
    }
    getApiResult()
  }, [])

  return (
    <>
      <PageTitle>商品一覧</PageTitle>
      <ProductTable
        products={products}
        setProducts={setProducts}
      />
    </>
  )
}

export default ProductList
