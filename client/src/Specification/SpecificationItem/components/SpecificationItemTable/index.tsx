import React from 'react'
import { Table } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { TSpecificationItem } from '../../page/SpecificationItemList'
import TableHeader from '../TableHeader'

type TSpecificationItemTable = {
  specification: any
  setSpecification: any
  itemType: string
  specificationId: string
  setModalInitialValue?: any
  setModalType?: any
  setEditId?: any
  setVisible?: any
}

const SpecificationTable: React.SFC<TSpecificationItemTable> = (props) => {
  const { specification, setSpecification, itemType, specificationId, setModalInitialValue, setModalType, setEditId, setVisible } = props
  let history = useHistory()
  let match = useRouteMatch()

  const onCreateClick = () => history.push(`${match.url}/new`)

  const specificationItemColumn = 
  [
    {
      title: '項目名',
      dataIndex: 'name',
      key: 'name',
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

  const deleteSpecificationItem = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/v1/specification_items/${id}`)
    const nextSpecificationItems: TSpecificationItem[] = specification.specification_items.filter((specificationItem: TSpecificationItem) => ( specificationItem.id !== id ))
    setSpecification({ ...specification, specification_items: nextSpecificationItems })
    history.push(`/specifications/${specificationId}/specification_items`)
  }

  const dataSource = Object.keys(specification).length === 0 ? [] :
  specification.specification_items.map((item: TSpecificationItem) => (
      {
        key: item.id,
        name: item.name,
        type: item.type,
        productName: item.product_name,
        maker: item.maker
      }
    )).filter((item: TSpecificationItem ) => item.type === itemType)

  return (
    <>
      <TableHeader onCreateClick={onCreateClick} />
      <Table size={'small'} dataSource={dataSource} columns={specificationItemColumn}/>
    </>
  )
}

export default SpecificationTable
