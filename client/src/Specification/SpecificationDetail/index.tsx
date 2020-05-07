import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'

const SpecificationDetail: React.SFC = () => {
  const [specification, setSpecification] : any = useState({})
  let match = useRouteMatch()
  let history = useHistory()
  const params: { id: string } = useParams()
  const id = params.id

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications/${id}`)
      setSpecification(result.data)
    }
    getApiResult()
  }, [])

  interface ISpecificationItem {
    id: string
    name: string
    type: string
    product_name: string
    maker: string
  }

  const dataSource = Object.keys(specification).length === 0 ? [] :
    specification.specification_items.map((item: ISpecificationItem) => (
      {
        key: item.id,
        name: item.name,
        type: item.type,
        productName: item.product_name,
        maker: item.maker
      }
    ))

  const specificationItemColumn = 
    [
      {
        title: '項目名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'タイプ',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '品番・形状等',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: 'メーカー',
        dataIndex: 'maker',
        key: 'maker',
      },
    ]

  return (
    <>
      <Table dataSource={dataSource} columns={specificationItemColumn}/>
      <button>
        <Link to={`${match.url}/new`}>新規作成</Link>
      </button>
    </>
  )
}

export default SpecificationDetail
