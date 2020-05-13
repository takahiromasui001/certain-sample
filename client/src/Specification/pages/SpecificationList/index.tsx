import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table } from 'antd'
import { useRouteMatch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import TableHeader from '../../components/TableHeader'
import SpecificationFormModal from '../../components/SpecificationFormModal'

const SpecificationList: React.SFC = () => {
  const [specifications, setSpecifications] : any = useState([])
  const [modalInitialValue, setModalInitialValue] = useState({})
  const [modalType, setModalType] = useState('')
  const [editId, setEditId] = useState('')

  const [visible, setVisible] = useState(false)
  let match = useRouteMatch()
  let history = useHistory()

  const onCreateClick = () => {
    setModalInitialValue({name: ''})
    setModalType('create')
    setEditId('')
    setVisible(true)
  }

  const onEditClick = (id: string) => {
    const getSpecificationItem = async () => {
      const response: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications/${id}`)

      setModalInitialValue({ name: response.data.name })
      setModalType('edit')
      setEditId(id)
      setVisible(true)
    }
    getSpecificationItem()
  }

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications`)
      setSpecifications(result.data)
    }
    getApiResult()
  }, [])

  interface ISpecification {
    id: string
    name: string
    updated_at: string
  }

  const dataSource = Object.keys(specifications).length === 0 ? [] :
  specifications.map((specification: ISpecification) => (
      {
        key: specification.id,
        name: specification.name,
        updated_at: specification.updated_at,
      }
    ))

  const deleteSpecificationItem = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/v1/specifications/${id}`)
    const nextSpecifications: ISpecification[] = specifications.filter((specification: ISpecification) => ( specification.id !== id ))
    setSpecifications(nextSpecifications)
    history.push(`/specifications/`)
  }

  const specificationItemColumn = 
    [
      {
        title: '仕様書名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '更新日',
        dataIndex: 'updated_at',
        key: 'updated_at',
      },
      {
        title: '',
        key: 'action',
        render: (record: any) => {
          return (
            <button onClick={() => {
              history.push(`/specifications/${record.key}/specification_items`)
            }}>
              仕様書項目
            </button>
          )
        },
      },
      {
        title: '',
        key: 'action',
        render: (record: any) => {
          return (
            <button onClick={() => onEditClick(record.key)}>
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
              deleteSpecificationItem(record.key) 
            }}>
              削除
            </button>
          )
        },
      },
    ]

  const onCreate = async (values: { name: string }) => {
    try {
      const result = await axios.post(`http://localhost:3000/api/v1/specifications`, {
        name: values.name,
      })
      const nextSpecifications: ISpecification[] = specifications.concat([{
        id: result.data.id, name: result.data.name, updated_at: result.data.updated_at
      }])
      setVisible(false)
      console.log(specifications)
      setSpecifications(...specifications, nextSpecifications)
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
        debugger
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
      <TableHeader onCreateClick={onCreateClick} />
      <Table dataSource={dataSource} columns={specificationItemColumn}/>
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
