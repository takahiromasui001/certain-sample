import React, { Dispatch, SetStateAction } from 'react'
import { Table } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import * as H from 'history'
import TableHeader from '../TableHeader'
import { IProduct } from '../../pages/ProductList'
import { ColumnTitle, NumColumnTitle } from 'src/shared/components/TableStyle'
import MenuButton from 'src/shared/components/MenuButton'

type TProductTable = {
  products: IProduct[]
  setProducts: any
  setModalInitialValue: any
  setModalType: any
  setEditId: any
  setVisible: any
}

const ProductTable: React.SFC<TProductTable> = (props) => {
  const { products, setProducts, setModalInitialValue, setModalType, setEditId, setVisible } = props

  let history = useHistory()

  const onCreateClick = () => {
    setModalInitialValue({ name: '', maker: '', price: '' })
    setModalType('create')
    setEditId('')
    setVisible(true)
  }

  const onEditClick = (id: string) => {
    const getProductItem = async () => {
      const response: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/products/${id}`)

      setModalInitialValue({ name: response.data.name, maker: response.data.maker, price: response.data.price })
      setModalType('edit')
      setEditId(id)
      setVisible(true)
    }
    getProductItem()
  }

  const deleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/v1/products/${id}`)
    const nextProductList: IProduct[] = products.filter((product: IProduct) => ( product.id !== id ))
    setProducts(nextProductList)
    history.push('/products')
  }

  const priceAlign: "left" | "right" | "center" = "right"

  const buildProductColumns = (products: IProduct[], setProducts: Dispatch<SetStateAction<IProduct[]>>, history: H.History<H.LocationState>) => {
    return (
      [
        {
          title: <ColumnTitle>名前</ColumnTitle>,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: <ColumnTitle>メーカー</ColumnTitle>,
          dataIndex: 'maker',
          key: 'maker',
        },
        {
          title: <NumColumnTitle>単価</NumColumnTitle>,
          dataIndex: 'price',
          key: 'price',
          align: priceAlign,
        },
        {
          title: '',
          key: 'action',
          width: '70px', 
          render: (record: any) => {
            return (
              <MenuButton
                onEditClick={() => onEditClick(record.key)}
                onCancelClick={() => deleteProduct(record.key)}
              />
            )
          },
        }
      ]
    )
  }
  
  const dataSource = products.map((product: IProduct) => {
    const price = Number(product.price).toLocaleString()
    const productPrice = (price === '0') ? '' : price

    return (
      {
        key: product.id,
        name: product.name,
        maker: product.maker,
        price: productPrice,
      }
    )
  })

  return (
    <>
      <TableHeader onCreateClick={onCreateClick} />
      <Table bordered size={'small'} dataSource={dataSource} columns={buildProductColumns(products, setProducts, history)}/>
    </>
  )
}

export default ProductTable
