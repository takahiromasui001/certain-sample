import React from 'react'
import { Table } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import { ISpecification } from '../../pages/SpecificationList'
import TableHeader from '../TableHeader'

type TSpecificationTable = {
  specifications: ISpecification[]
  setModalInitialValue: any
  setModalType: any
  setEditId: any
  setVisible: any
  setSpecifications: any
}

const SpecificationTable: React.SFC<TSpecificationTable> = (props) => {
  const { specifications, setModalInitialValue, setModalType, setEditId, setVisible, setSpecifications } = props
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

  const deleteSpecificationItem = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/v1/specifications/${id}`)
    const nextSpecifications: ISpecification[] = specifications.filter((specification: ISpecification) => ( specification.id !== id ))
    setSpecifications(nextSpecifications)
    history.push(`/specifications/`)
  }

  const dataSource = Object.keys(specifications).length === 0 ? [] :
  specifications.map((specification: ISpecification) => (
      {
        key: specification.id,
        name: specification.name,
        updated_at: specification.updated_at,
      }
    ))

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

  return (
    <>
      <TableHeader onCreateClick={onCreateClick} />
      <Table dataSource={dataSource} columns={specificationItemColumn}/>
    </>
  )
}

export default SpecificationTable
