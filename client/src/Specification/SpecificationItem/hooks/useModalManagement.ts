import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { TSpecificationItem, TSpecificationWithItem } from '../page/SpecificationItemList'
import { useHistory } from 'react-router-dom'

type TModalInitialValue = { name: string, type: string, productId: string, colorId: string }
const formInitialValue: TSpecificationItemForm = { id: '', name: '', type: '', maker: '', productId: '', colorId: '', productCandidate: [], customize: false }

type TSpecificationItemForm = {
  id: string
  name: string
  type: string
  maker: string
  productId: string
  colorId: string
  productCandidate: string[]
  customize: boolean
}

type TUseModalManagement = {
  specificationId: string, 
  setSpecification: React.Dispatch<React.SetStateAction<TSpecificationWithItem>>,
  specification: TSpecificationWithItem,
  editId: string
}

const useModalManagement = (props: TUseModalManagement) => {
  const { specificationId, setSpecification, specification, editId } = props
  const [visible, setVisible] = useState(false)
  const [formValue, setFormValue] = useState<TSpecificationItemForm>(formInitialValue)
  const [modalType, setModalType] = useState('')
  let history = useHistory()

  const createPutParams = (values: TSpecificationItemForm) => ({
    name: values.name,
    type: values.type,
    productId: values.productId,
    colorId: values.colorId,
    specificationId: specificationId,
    productCandidate: values.productCandidate,
    customize: values.customize,
  })

  const createSpecificationItem = (result: TSpecificationItem) => ({
    id: result.id, name: result.name, type: result.type, product_name: result.product_name,
    maker: result.maker, color_name: result.color_name, customize: result.customize
  })

  const cleanUpModal = (nextSpecificationItems: any[]) => {
    setFormValue(formInitialValue)
    setVisible(false)
    setSpecification({
      ...specification,
      specification_items: nextSpecificationItems
    })
  }

  const onCreate = async (values: TSpecificationItemForm) => {
    try {
      const result = await axios.post(`http://localhost:3000/api/v1/specification_items`, createPutParams(values))
      const nextSpecificationItems: TSpecificationItem[] = specification.specification_items.concat([createSpecificationItem(result.data)])
      cleanUpModal(nextSpecificationItems)
    } catch(error) {
      history.push(`/specifications/new`)
    }
  }

  const onEdit = async (values: TSpecificationItemForm) => {
    try {
      const result = await axios.patch(`http://localhost:3000/api/v1/specification_items/${editId}`, createPutParams(values))
      const nextSpecificationItems = specification.specification_items.map((item: TSpecificationItem) => (
        item.id === result.data.id ? createSpecificationItem(result.data) : item
      ))
      cleanUpModal(nextSpecificationItems)
    } catch(error) {
      // history.push(`/specifications/${id}/`)
    }
  }

  const onCancel = () => {
    setFormValue(formInitialValue)
    setVisible(false)
  }

  return { 
    onCreate: onCreate,
    onEdit: onEdit,
    onCancel: onCancel,
    visible: visible,
    formValue: formValue,
    setFormValue: setFormValue,
    setVisible: setVisible,
    modalType: modalType,
    setModalType: setModalType
  }
}

export default useModalManagement
