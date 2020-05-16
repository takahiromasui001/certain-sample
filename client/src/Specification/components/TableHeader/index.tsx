import React from 'react'
import { Button, Input, Row, Col, Checkbox } from 'antd'
import { Container, SearchButtonGroup, StyledCreateButton, StyledSearchButton } from './style'

type ITableHeader = {
  onCreateClick: () => void
}

const TableHeader: React.FC<ITableHeader> = (props) => {
  const { onCreateClick } = props

  return (
    <Container>
      <Input.Group>
        <Row gutter={8}>
          <Col span={6}>
            <Input placeholder='仕様書名'/>
          </Col>
          <Col span={3} style={{margin: "auto 0", marginLeft: "10px", fontSize: "10px"}}>
            <Checkbox style={{fontSize: "13px"}}>担当者自分のみ</Checkbox>
          </Col>
          <Col span={6}>
            <SearchButtonGroup>
              <StyledSearchButton
                  type="primary"
                  className="margin-right"
                  disabled={true}
                >
                  <div>検索</div>
              </StyledSearchButton>
              <StyledSearchButton
                  type="default"
                  className="margin-right"
                  disabled={true}
                >
                  <div>クリア</div>
              </StyledSearchButton>
            </SearchButtonGroup>
          </Col>
        </Row>
      </Input.Group>
      <StyledCreateButton onClick={onCreateClick}>
        新規作成
      </StyledCreateButton>
    </Container>
  )
}

export default TableHeader 
