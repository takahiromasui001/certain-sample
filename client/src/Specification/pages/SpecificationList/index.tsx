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
  const [visible, setVisible] = useState(false)
  let match = useRouteMatch()
  let history = useHistory()

  const onCreateClick = () => setVisible(true)

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
            <button onClick={() => {
              history.push(`/specifications/${record.key}`)
            }}>
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

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
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
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  )
}

export default SpecificationList
