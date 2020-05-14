import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import ProductFormModal from '../../components/ProductFormModal'
import ProductTable from '../../components/ProductTable'

export interface IProduct {
  id: number
  name: string
  maker: string
  price: number
}

const ProductList: React.SFC = () => {
  const [products, setProducts] : any = useState([])
  const [visible, setVisible] = useState(false)
  const [modalInitialValue, setModalInitialValue] = useState({})
  const [modalType, setModalType] = useState('')
  const [editId, setEditId] = useState('')

  let history = useHistory()

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get('http://localhost:3000/api/v1/products')
      setProducts(result.data)
    }
    getApiResult()
  }, [])

  const onCreate = async (values: { name: string, maker: string, price: string }) => {
    try {
      const result = await axios.post('http://localhost:3000/api/v1/products', {
        name: values.name,
        maker: values.maker,
        price: values.price
      })
      const nextProducts: IProduct[] = products.concat([{
        id: result.data.id, name: result.data.name, maker: result.data.maker, price: result.data.price
      }])
      setVisible(false)
      setProducts(nextProducts)
    } catch(error) {
      history.push(`/specifications/new`)
    }
  }

  const onEdit = async (values: { name: string, maker: string, price: string }) => {
    try {
      const result :AxiosResponse = await axios.patch(`http://localhost:3000/api/v1/products/${editId}`, {
        name: values.name,
        maker: values.maker,
        price: values.price
      })

      const updatedProduct = { id: result.data.id, name: result.data.name, maker: result.data.maker, price: result.data.price }
      const nextProducts: IProduct[] = products.map((product: IProduct) => {
        return product.id === updatedProduct.id ? updatedProduct : product 
      })
      setVisible(false)
      setProducts(nextProducts)
    } catch(error) {
      // history.push(`/specifications/${id}/`)
    }
  }

  const onCancel = () => {
    setVisible(false);
  }

  return (
    <>
      <PageTitle>商品一覧</PageTitle>
      <ProductTable
        products={products}
        setProducts={setProducts}
        setModalInitialValue={setModalInitialValue}
        setModalType={setModalType}
        setEditId={setEditId}
        setVisible={setVisible}
      />
      <ProductFormModal
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}
        onEdit={onEdit}
        initialValue={modalInitialValue}
        modalType={modalType}
      />
    </>
  )
}

export default ProductList
