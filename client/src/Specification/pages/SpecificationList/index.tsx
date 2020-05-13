import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import SpecificationFormModal from '../../components/SpecificationFormModal'
import SpecificationTable from '../../components/SpecificationTable'

export interface ISpecification {
  id: string
  name: string
  updated_at: string
}

const SpecificationList: React.SFC = () => {
  const [specifications, setSpecifications] : any = useState([])
  const [modalInitialValue, setModalInitialValue] = useState({})
  const [modalType, setModalType] = useState('')
  const [editId, setEditId] = useState('')

  const [visible, setVisible] = useState(false)
  let history = useHistory()

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications`)
      setSpecifications(result.data)
    }
    getApiResult()
  }, [])

  const onCreate = async (values: { name: string }) => {
    try {
      const result = await axios.post(`http://localhost:3000/api/v1/specifications`, {
        name: values.name,
      })
      const nextSpecifications: ISpecification[] = specifications.concat([{
        id: result.data.id, name: result.data.name, updated_at: result.data.updated_at
      }])
      setVisible(false)
      setSpecifications(nextSpecifications)
    } catch(error) {
      history.push(`/specifications/new`)
    }
  }

  const onEdit = async (values: { name: string }) => {
    try {
      const result: any = await axios.patch(`http://localhost:3000/api/v1/specifications/${editId}`, {
        name: values.name,
      })
      const updatedSpacification = { id: result.data.id, name: result.data.name, updated_at: result.data.updated_at }
      const nextSpecifications: ISpecification[] = specifications.map((specification: ISpecification) => {
        return specification.id === updatedSpacification.id ? updatedSpacification : specification
      })
      setVisible(false)
      setSpecifications(nextSpecifications)
    } catch(error) {
      // history.push(`/specifications/${id}/`)
    }
  }

  const onCancel = () => {
    setVisible(false);
  }

  return (
    <>
      <PageTitle>仕様書一覧</PageTitle>
      <SpecificationTable
        specifications={specifications}
        setModalInitialValue={setModalInitialValue}
        setModalType={setModalType}
        setEditId={setEditId}
        setVisible={setVisible}
        setSpecifications={setSpecifications}
      />
      <SpecificationFormModal
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

export default SpecificationList
