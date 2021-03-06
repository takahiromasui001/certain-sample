import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import SpecificationFormModal from '../../components/SpecificationFormModal'
import SpecificationTable from '../../components/SpecificationTable'
import useEmployeeList from '../../hooks/useEmployeeList'

export type TSpecification = {
  id: string
  name: string
  updated_at: string
  status: string
  constructionMethod: string
  amount: string
  employee: { name: string }
}

const SpecificationList: React.SFC = () => {
  const [specifications, setSpecifications] : any = useState([])
  const [visible, setVisible] = useState(false)
  const [modalInitialValue, setModalInitialValue] = useState({})
  const [modalType, setModalType] = useState('')
  const [editId, setEditId] = useState('')

  let history = useHistory()
  const employees = useEmployeeList()

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications`)
      setSpecifications(result.data)
    }
    getApiResult()
  }, [])

  const createPutParams = (values: TSpecification) => ({
    name: values.name, status: values.status, constructionMethod: values.constructionMethod,
    amount: values.amount, employee: values.employee
  })

  const createSpecificationItem = (result: TSpecification) => ({
    id: result.id, name: result.name, updated_at: result.updated_at,
    status: result.status, constructionMethod: result.constructionMethod,
    amount: result.amount, employee: result.employee
  })

  const onCreate = async (values: TSpecification) => {
    try {
      const result = await axios.post(`http://localhost:3000/api/v1/specifications`, createPutParams(values))
      const nextSpecifications: TSpecification[] = specifications.concat([createSpecificationItem(result.data)])
      setVisible(false)
      setSpecifications(nextSpecifications)
    } catch(error) {
      history.push(`/specifications/new`)
    }
  }

  const onEdit = async (values: TSpecification) => {
    try {
      const result: any = await axios.patch(`http://localhost:3000/api/v1/specifications/${editId}`, createPutParams(values))
      const updatedSpacification = createSpecificationItem(result.data)
      const nextSpecifications: TSpecification[] = specifications.map((specification: TSpecification) => {
        return specification.id === updatedSpacification.id ? updatedSpacification : specification
      })
      setVisible(false)
      setSpecifications(nextSpecifications)
    } catch(error) {
      // history.push(`/specifications/${id}/`)
    }
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <PageTitle>仕様書一覧</PageTitle>
      <SpecificationTable
        specifications={specifications}
        setSpecifications={setSpecifications}
        setModalInitialValue={setModalInitialValue}
        setModalType={setModalType}
        setEditId={setEditId}
        setVisible={setVisible}
      />
      <SpecificationFormModal
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}
        onEdit={onEdit}
        initialValue={modalInitialValue}
        modalType={modalType}
        employees={employees}
      />
    </>
  )
}

export default SpecificationList
