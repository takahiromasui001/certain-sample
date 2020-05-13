import React, { Dispatch, SetStateAction } from 'react'
import { Table } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { useRouteMatch, useHistory } from 'react-router-dom'
import * as H from 'history'
import TableHeader from '../TableHeader'
import { IProduct } from '../../pages/ProductList'

type TProductTable = {
  products: IProduct[]
  setProducts: any
}

const ProductTable: React.SFC<TProductTable> = (props) => {
  const { products, setProducts } = props

  let match = useRouteMatch()
  let history = useHistory()

  const onCreateClick = () => history.push(`${match.url}/new`)

  const buildProductColumns = (products: IProduct[], setProducts: Dispatch<SetStateAction<IProduct[]>>, history: H.History<H.LocationState>) => {
    const deleteProduct = async (id: number) => {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`)
      const nextProductList: IProduct[] = products.filter((product: IProduct) => ( product.id !== id ))
      setProducts(nextProductList)
      history.push('/products')
    }
  
    return (
      [
        {
          title: '名前',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'メーカー',
          dataIndex: 'maker',
          key: 'maker',
        },
        {
          title: '価格',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '',
          key: 'action',
          render: (record: any) => {
            return (
              <button onClick={() => {
                history.push(`/products/${record.key}`)
              }}>
                編集
              </button>
            )
          },
        },
        {
          title: '',
          key: 'action',
          render: (record: any) => {
            return (
              <button onClick={() => {
                deleteProduct(record.key) 
              }}>
                削除
              </button>
            )
          },
        },
      ]
    )
  }
  
  const dataSource = products.map((product: IProduct) => (
    {
      key: product.id,
      name: product.name,
      maker: product.maker,
      price: product.price,
    }
  ))

  return (
    <>
      <TableHeader onCreateClick={onCreateClick} />
      <Table dataSource={dataSource} columns={buildProductColumns(products, setProducts, history)}/>
    </>
  )
}

export default ProductTable
