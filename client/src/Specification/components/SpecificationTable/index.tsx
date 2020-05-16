import React from 'react'
import { Table, Button } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import { TSpecification } from '../../pages/SpecificationList'
import TableHeader from '../TableHeader'
import MenuButton from 'src/shared/components/MenuButton'
import { ColumnTitle } from 'src/shared/components/TableStyle'

type TSpecificationTable = {
  specifications: TSpecification[]
  setSpecifications: any
  setModalInitialValue: any
  setModalType: any
  setEditId: any
  setVisible: any
}

const SpecificationTable: React.SFC<TSpecificationTable> = (props) => {
  const { specifications, setSpecifications, setModalInitialValue, setModalType, setEditId, setVisible } = props
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

      setModalInitialValue({ 
        name: response.data.name, status: response.data.status,
        constructionMethod: response.data.constructionMethod,
        amount: response.data.amount, employee: response.data.employee,
      })
      setModalType('edit')
      setEditId(id)
      setVisible(true)
    }
    getSpecificationItem()
  }

  const deleteSpecification = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/v1/specifications/${id}`)
    const nextSpecifications: TSpecification[] = specifications.filter((specification: TSpecification) => ( specification.id !== id ))
    setSpecifications(nextSpecifications)
    history.push(`/specifications/`)
  }

  const statusView: {[index: string]: string} = { 
    consultation: '新規相談', provisional: '仮契約', contract: '本契約', start: '着工', completion: '竣工', finished: '引き渡し'
  }
  const methodView: {[index: string]: string} = { conventional: '在来工法', two_by_four: '2×4' }

  const dataSource = Object.keys(specifications).length === 0 ? [] :
    specifications.map((specification: TSpecification) => {
      const amount = Number(specification.amount).toLocaleString()
      const productAmount = (amount === '0') ? '' : amount
      const employee: string = specification.employee.name

      return(
        {
          key: specification.id,
          name: specification.name,
          updated_at: specification.updated_at,
          status: statusView[specification.status],
          constructionMethod: methodView[specification.constructionMethod],
          amount: productAmount,
          employee: employee
        }  
      )
    })

  const amountAlign: "left" | "right" | "center" = "right"

  const specificationItemColumn = 
  [
    {
      title: <ColumnTitle>仕様書名</ColumnTitle>,
      key: 'action',
      render: (record: any) => {
        return (
          <Button type="link" onClick={() => {
            history.push(`/specifications/${record.key}/specification_items`)
          }}>
            {record.name}
          </Button>
        )
      }
    },
    {
      title: <ColumnTitle>契約・工事状況</ColumnTitle>,
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: <ColumnTitle>工法</ColumnTitle>,
      dataIndex: 'constructionMethod',
      key: 'constructionMethod',
    },
    {
      title: <ColumnTitle>担当者</ColumnTitle>,
      dataIndex: 'employee',
      key: 'employee',
    },
    {
      title: <ColumnTitle>見積金額</ColumnTitle>,
      dataIndex: 'amount',
      key: 'amount',
      align: amountAlign,
    },
    {
      title: <ColumnTitle>最終変更日</ColumnTitle>,
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: '',
      key: 'action',
      width: '70px',
      render: (record: any) => {
        return (
          <MenuButton
            onEditClick={() => onEditClick(record.key)}
            onCancelClick={() => deleteSpecification(record.key)}
          />
        )
      },
    }
  ]

  return (
    <>
      <TableHeader onCreateClick={onCreateClick} />
      <Table bordered size={'small'} dataSource={dataSource} columns={specificationItemColumn}/>
    </>
  )
}

export default SpecificationTable
