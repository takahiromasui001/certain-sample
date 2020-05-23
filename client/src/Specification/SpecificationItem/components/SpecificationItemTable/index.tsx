import React from 'react'
import { Table } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import { TSpecificationItem } from '../../page/SpecificationItemList'
import TableHeader from '../TableHeader'
import MenuButton from 'src/shared/components/MenuButton'
import { ColumnTitle } from 'src/shared/components/TableStyle'

type TSpecificationItemTable = {
  specification: any
  setSpecification: any
  itemType: string
  specificationId: string
  setFormInitialValue?: any
  setModalType?: any
  setEditId?: any
  setVisible?: any
}

const SpecificationTable: React.SFC<TSpecificationItemTable> = (props) => {
  const { specification, setSpecification, itemType, specificationId, setFormInitialValue, setModalType, setEditId, setVisible } = props
  let history = useHistory()

  const onCreateClick = () => {
    setModalType('create')
    setEditId('')
    setVisible(true)
  }

  const onEditClick = (id: string) => {
    const getSpecificationItem = async () => {
      const response: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specification_items/${id}`)
      setFormInitialValue({
        name: response.data.name, type: response.data.specification_type,
        productId: response.data.product_id, colorId: response.data.color_id
      })
      setModalType('edit')
      setEditId(id)
      setVisible(true)
    }
    getSpecificationItem()
  }

  const deleteSpecificationItem = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/v1/specification_items/${id}`)
    const nextSpecificationItems: TSpecificationItem[] = specification.specification_items.filter((specificationItem: TSpecificationItem) => ( specificationItem.id !== id ))
    setSpecification({ ...specification, specification_items: nextSpecificationItems })
    history.push(`/specifications/${specificationId}/specification_items`)
  }

  const specificationItemColumn = 
  [
    {
      title: <ColumnTitle>項目名</ColumnTitle>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <ColumnTitle>品番・形状等</ColumnTitle>,
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: <ColumnTitle>メーカー</ColumnTitle>,
      dataIndex: 'maker',
      key: 'maker',
    },
    {
      title: <ColumnTitle>カラー</ColumnTitle>,
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: '',
      key: 'action',
      width: '70px', 
      render: (record: any) => {
        return (
          <MenuButton
            onEditClick={() => onEditClick(record.key)}
            onCancelClick={() => deleteSpecificationItem(record.key)}
          />
        )
      },
    }
  ]

  const dataSource = Object.keys(specification).length === 0 ? [] :
  specification.specification_items.map((item: TSpecificationItem) => (
      {
        key: item.id,
        name: item.name,
        type: item.type,
        productName: item.product_name,
        maker: item.maker,
        color: item.color_name
      }
    )).filter((item: TSpecificationItem ) => item.type === itemType)

  return (
    <>
      <TableHeader onCreateClick={onCreateClick} />
      <Table bordered size={'small'} dataSource={dataSource} columns={specificationItemColumn}/>
    </>
  )
}

export default SpecificationTable
