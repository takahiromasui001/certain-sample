import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table } from 'antd'
import { useRouteMatch } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import TableHeader from '../../components/TableHeader'

const SpecificationItemList: React.SFC = () => {
  const [specification, setSpecification] : any = useState({})
  let match = useRouteMatch()
  let history = useHistory()
  const params: { id: string } = useParams()
  const specificationId = params.id

  const onCreateClick = () => history.push(`${match.url}/new`)


  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications/${specificationId}`)
      setSpecification(result.data)
    }
    getApiResult()
  }, [specificationId])

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

  const deleteSpecificationItem = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/v1/specification_items/${id}`)
    const nextSpecificationItems: ISpecificationItem[] = specification.specification_items.filter((specificationItem: ISpecificationItem) => ( specificationItem.id !== id ))
    setSpecification({ ...specification, specification_items: nextSpecificationItems })
    history.push(`/specifications/${specificationId}/specification_items`)
  }

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
      {
        title: '',
        key: 'action',
        render: (record: any) => {
          return (
            <button onClick={() => {
              history.push(`/specifications/${specificationId}/specification_items/${record.key}`)
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
      <PageTitle>仕様書項目一覧</PageTitle>
      <TableHeader onCreateClick={onCreateClick} />
      <Table dataSource={dataSource} columns={specificationItemColumn}/>
    </>
  )
}

export default SpecificationItemList
