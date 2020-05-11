import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table, Tabs } from 'antd'
import { useRouteMatch } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import TableHeader from '../../components/TableHeader'

const { TabPane } = Tabs

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

  const dataSourceOrg = Object.keys(specification).length === 0 ? [] :
  specification.specification_items.map((item: ISpecificationItem) => (
      {
        key: item.id,
        name: item.name,
        type: item.type,
        productName: item.product_name,
        maker: item.maker
      }
    ))

  const dataSourceInner = dataSourceOrg.filter((item: ISpecificationItem ) => item.type === "inner")
  const dataSourceOuter = dataSourceOrg.filter((item: ISpecificationItem ) => item.type === "outer")
  const dataSourceInnerFinishing = dataSourceOrg.filter((item: ISpecificationItem ) => item.type === "inner_finishing")
  const dataSourceInnerEquipment = dataSourceOrg.filter((item: ISpecificationItem ) => item.type === "equipment")

  console.log(dataSourceInner)
  console.log(dataSourceInnerFinishing)
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

  const callback = (key: string) => {
    console.log(key);
  }
  return (
    <>
      <PageTitle>仕様書項目一覧</PageTitle>
      <TableHeader onCreateClick={onCreateClick} />
      <Tabs defaultActiveKey="1" onChange={callback} type="card">
        <TabPane tab="外部仕様書" key="1">
          <Table dataSource={dataSourceInner} columns={specificationItemColumn}/>
        </TabPane>
        <TabPane tab="内部仕様書" key="2">
          <Table dataSource={dataSourceOuter} columns={specificationItemColumn}/>
        </TabPane>
        <TabPane tab="住宅設備・その他" key="3">
          <Table dataSource={dataSourceInnerEquipment} columns={specificationItemColumn}/>
        </TabPane>
        <TabPane tab="内部仕上げ表" key="4">
          <Table dataSource={dataSourceInnerFinishing} columns={specificationItemColumn}/>
        </TabPane>
      </Tabs>
    </>
  )
}

export default SpecificationItemList
