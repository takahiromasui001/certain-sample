import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import ProductFormModal from '../../components/ProductFormModal'
import ProductTable from '../../components/ProductTable'

export type TProduct = {
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

  const createPutParams = (values: TProduct) => ({
    name: values.name, maker: values.maker, price: values.price
  })

  const createSpecification = (result: TProduct) => ({
    id: result.id, name: result.name, maker: result.maker, price: result.price
  })

  const onCreate = async (values: TProduct) => {
    try {
      const result = await axios.post('http://localhost:3000/api/v1/products', createPutParams(values))
      const nextProducts: TProduct[] = products.concat([createSpecification(result.data)])
      setVisible(false)
      setProducts(nextProducts)
    } catch(error) {
      history.push(`/specifications/new`)
    }
  }

  const onEdit = async (values: TProduct) => {
    try {
      const result :AxiosResponse = await axios.patch(`http://localhost:3000/api/v1/products/${editId}`, createPutParams(values))
      const updatedProduct = createSpecification(result.data)
      const nextProducts: TProduct[] = products.map((product: TProduct) => {
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
