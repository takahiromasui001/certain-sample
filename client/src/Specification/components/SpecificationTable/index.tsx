import React from 'react'
import { Table, Button } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'
import { ISpecification } from '../../pages/SpecificationList'
import TableHeader from '../TableHeader'
import MenuButton from 'src/shared/components/MenuButton'
import { ColumnTitle, NumColumnTitle } from 'src/shared/components/TableStyle'

type TSpecificationTable = {
  specifications: ISpecification[]
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

      console.log(response)
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
    const nextSpecifications: ISpecification[] = specifications.filter((specification: ISpecification) => ( specification.id !== id ))
    setSpecifications(nextSpecifications)
    history.push(`/specifications/`)
  }

  const statusView: {[index: string]: string} = { start: '新規作成', completed: '完了' }
  const methodView: {[index: string]: string} = { conventional: '在来工法', two_by_four: '2×4' }

  const dataSource = Object.keys(specifications).length === 0 ? [] :
    specifications.map((specification: ISpecification) => {
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
      title: <ColumnTitle>ステータス</ColumnTitle>,
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
      title: <NumColumnTitle>見積金額</NumColumnTitle>,
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
