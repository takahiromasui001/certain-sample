import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table, Tabs } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import PageTitle from 'src/shared/components/PageTitle'
import SpecificationItemTable from '../../components/SpecificationItemTable'

const { TabPane } = Tabs

export type TSpecificationItem = {
  id: string
  name: string
  type: string
  product_name: string
  maker: string
}

const SpecificationItemList: React.SFC = () => {
  const [specification, setSpecification] : any = useState({})
  let history = useHistory()
  const params: { id: string } = useParams()
  const specificationId = params.id

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/specifications/${specificationId}`)
      setSpecification(result.data)
    }
    getApiResult()
  }, [specificationId])

  const callback = (key: string) => {
    console.log(key);
  }

  const tableProps = {
    specification: specification,
    setSpecification: setSpecification,
    specificationId: specificationId  
  }

  return (
    <>
      <PageTitle>仕様書項目一覧</PageTitle>
      <Tabs defaultActiveKey="1" onChange={callback} type="card">
        <TabPane tab="外部仕様書" key="1">
          <SpecificationItemTable itemType="outer" {...tableProps} />
        </TabPane>
        <TabPane tab="内部仕様書" key="2">
          <SpecificationItemTable itemType="inner" {...tableProps} />
        </TabPane>
        <TabPane tab="住宅設備・その他" key="3">
          <SpecificationItemTable itemType="inner_finishing" {...tableProps} />
        </TabPane>
        <TabPane tab="内部仕上げ表" key="4">
          <SpecificationItemTable itemType="equipment" {...tableProps} />
        </TabPane>
      </Tabs>
    </>
  )
}

export default SpecificationItemList
