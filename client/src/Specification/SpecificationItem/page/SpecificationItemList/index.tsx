import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Tabs } from 'antd'
import { useParams } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import SpecificationItemFormModal from '../../components/SpecificationItemFormModal'
import SpecificationItemTable from '../../components/SpecificationItemTable'
import useProductList from '../../hooks/useProductList'
import useModalManagement from '../../hooks/useModalManagement'

const { TabPane } = Tabs

export type TSpecificationItem = {
  id: string
  name: string
  type: string
  maker: string
  product_name: string
  color_name: string
  customize: string
}

export type TSpecificationWithItem = {
  id: string
  name: string
  specification_items: TSpecificationItem[]
}
const SpecificationItemInitialValue = { id: '', name: '', specification_items: [] }

const SpecificationItemList: React.SFC = () => {
  const [specification, setSpecification] = useState<TSpecificationWithItem>(SpecificationItemInitialValue)
  const [editId, setEditId] = useState('')
  const products = useProductList()
  const params: { id: string } = useParams()
  const specificationId = params.id

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications/${specificationId}`)
      setSpecification(result.data)
    }
    getApiResult()
  }, [specificationId])

  const useModalManagementParams = {
    specificationId: specificationId, specification: specification,
    setSpecification: setSpecification, editId: editId
  }
  const { 
    onCreate, onEdit, onCancel, visible, formValue, setFormValue, setVisible, modalType, setModalType
  } = useModalManagement(useModalManagementParams)

  const tableProps = {
    specification: specification,
    setSpecification: setSpecification,
    specificationId: specificationId,
    setFormInitialValue: setFormValue,
    setModalType: setModalType,
    setEditId: setEditId,
    setVisible: setVisible
  }

  return (
    <>
      <PageTitle>{specification.name}</PageTitle>
      <Tabs defaultActiveKey="1" type="card">
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
        initialValue={formValue}
        modalType={modalType}
      />
    </>
  )
}

export default SpecificationItemList
