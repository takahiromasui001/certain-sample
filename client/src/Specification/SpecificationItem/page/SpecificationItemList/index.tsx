import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Tabs } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import SpecificationItemFormModal from '../../components/SpecificationItemFormModal'
import SpecificationItemTable from '../../components/SpecificationItemTable'
import useProductList from '../../hooks/useProductList'

const { TabPane } = Tabs

export type TSpecificationItem = {
  id: string
  name: string
  type: string
  maker: string
  product_name: string
  color_name: string
  specification_items: any[]
}
const SpecificationItemInitialValue = {
  id: '', name: '', type: '', maker: '', product_name: '', color_name: '',
  specification_items: []
}

type TModalInitialValue = {
  name: string, type: string, productId: string, colorId: string
}
// Note:
// TSpecificationItemFormはあくまでFormの入力値に対する型で、
// TSpecificationItem(stateの型)とは全く別の概念と判断。
// 共通するプロパティは多いが完全に分ける
type TSpecificationItemForm = {
  id: string
  name: string
  type: string
  maker: string
  productId: string
  colorId: string
}

const SpecificationItemList: React.SFC = () => {
  const [specification, setSpecification] = useState<TSpecificationItem>(SpecificationItemInitialValue)
  const [visible, setVisible] = useState(false)
  const [modalInitialValue, setModalInitialValue] = useState<TModalInitialValue>({ name: '', type: '', productId: '', colorId: '' })
  const [modalType, setModalType] = useState('')
  const [editId, setEditId] = useState('')
  
  let history = useHistory()
  const params: { id: string } = useParams()
  const specificationId = params.id
  const products = useProductList()

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications/${specificationId}`)
      setSpecification(result.data)
    }
    getApiResult()
  }, [specificationId])

  const createPutParams = (values: TSpecificationItemForm) => ({
    name: values.name,
    type: values.type,
    productId: values.productId,
    colorId: values.colorId,
    specificationId: specificationId,
  })

  const createSpecification = (result: TSpecificationItem) => ({
    id: result.id, name: result.name, type: result.type, product_name: result.product_name, maker: result.maker, color_name: result.color_name
  })

  const onCreate = async (values: TSpecificationItemForm) => {
    try {
      const result = await axios.post(`http://localhost:3000/api/v1/specification_items`, createPutParams(values))

      const nextSpecificationItems: TSpecificationItem[] = specification.specification_items.concat([createSpecification(result.data)])
      const nextSpecification = {
        ...specification,
        specification_items: nextSpecificationItems
      }

      setVisible(false)
      setSpecification(nextSpecification)
    } catch(error) {
      history.push(`/specifications/new`)
    }
  }

  const onEdit = async (values: TSpecificationItemForm) => {
    try {
      const result = await axios.patch(`http://localhost:3000/api/v1/specification_items/${editId}`, createPutParams(values))

      const updatedSpacification = createSpecification(result.data)
      const nextSpecificationItems = specification.specification_items.map((item: TSpecificationItem) => (
        item.id === result.data.id ? updatedSpacification : item
      ))

      setVisible(false)
      setSpecification({
        ...specification,
        specification_items: nextSpecificationItems
      })
    } catch(error) {
      // history.push(`/specifications/${id}/`)
    }
  }

  const onCancel = () => {
    setVisible(false)
  }

  const callback = (key: string) => {
    console.log(key);
  }

  const tableProps = {
    specification: specification,
    setSpecification: setSpecification,
    specificationId: specificationId,
    setModalInitialValue: setModalInitialValue,
    setModalType: setModalType,
    setEditId: setEditId,
    setVisible: setVisible
  }

  return (
    <>
      <PageTitle>{specification.name}</PageTitle>
      <Tabs defaultActiveKey="1" onChange={callback} type="card">
        <TabPane tab="外部仕様書" key="1">
          <SpecificationItemTable itemType="outer" {...tableProps} />
        </TabPane>
        <TabPane tab="内部仕様書" key="2">
          <SpecificationItemTable itemType="inner" {...tableProps} />
        </TabPane>
        <TabPane tab="住宅設備・その他" key="3">
          <SpecificationItemTable itemType="equipment" {...tableProps} />
        </TabPane>
        <TabPane tab="内部仕上げ表" key="4">
          <SpecificationItemTable itemType="inner_finishing" {...tableProps} />
        </TabPane>
      </Tabs>
      <SpecificationItemFormModal
        products={products}
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

export default SpecificationItemList
