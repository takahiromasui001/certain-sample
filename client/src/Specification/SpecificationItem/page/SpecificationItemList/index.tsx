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
  product_name: string
  maker: string
}

const SpecificationItemList: React.SFC = () => {
  const [specification, setSpecification] : any = useState({})
  const [visible, setVisible] = useState(false)
  const [modalInitialValue, setModalInitialValue] = useState({ name: '', type: '', productId: '' })
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

  const onCreate = async (values: { name: string, type: number, productId: number, specificationId: number }) => {
    try {
      const result = await axios.post(`http://localhost:3000/api/v1/specification_items`, {
        name: values.name,
        type: values.type,
        productId: values.productId,
        specificationId: specificationId,
      })

      const nextSpecificationItems: TSpecificationItem[] = specification.specification_items.concat([{
        id: result.data.id, name: result.data.name, type: result.data.type, product_name: result.data.product_name, maker: result.data.maker
      }])

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

  const onEdit = async (values: { name: string, type: number, productId: number, specificationId: number }) => {
    try {
      const result = await axios.patch(`http://localhost:3000/api/v1/specification_items/${editId}`, {
        name: values.name,
        type: values.type,
        productId: values.productId,
        specificationId: specificationId,
      })

      const updatedSpacification = { id: result.data.id, name: result.data.name, type: result.data.type, product_name: result.data.product_name, maker: result.data.maker }
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
