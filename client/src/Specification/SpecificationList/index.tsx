import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'

const SpecificationList: React.SFC = () => {
  const [specifications, setSpecifications] : any = useState([])
  let match = useRouteMatch()
  let history = useHistory()
  // const params: { id: string } = useParams()
  // const id = params.id

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

  return (
    <>
      <Table dataSource={dataSource} columns={specificationItemColumn}/>
      <button>
        <Link to={`${match.url}/specification_items/new`}>新規作成</Link>
      </button>
    </>
  )
}

export default SpecificationList
