import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table, Button } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import { productColumns } from './constant'

const ProductList: React.SFC = () => {
  const [products, setProducts] : any = useState([])
  let match = useRouteMatch()

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get('http://localhost:3000/api/v1/products')
      setProducts(result.data)
    }
    getApiResult()
  }, [])

  const dataSource = products.map((product: { id: number, name: string, maker: string, price: number }) => (
    {
      key: product.id,
      name: product.name,
      maker: product.maker,
      price: product.price,
    }
  ))

  return (
    <>
      <Table dataSource={dataSource} columns={productColumns}/>
      <button>
        <Link to={`${match.url}/new`}>新規作成</Link>
      </button>
    </>
  )
}

export default ProductList
