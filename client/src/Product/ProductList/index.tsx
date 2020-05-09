import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table } from 'antd'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import * as H from 'history';
import PageTitle from 'src/shared/PageTitle'

export interface IProduct {
  id: number
  name: string
  maker: string
  price: number
}

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
      <PageTitle>商品一覧</PageTitle>
      <Table dataSource={dataSource} columns={buildProductColumns(products, setProducts, history)}/>
      <button>
        <Link to={`${match.url}/new`}>新規作成</Link>
      </button>
    </>
  )
}

export default ProductList
