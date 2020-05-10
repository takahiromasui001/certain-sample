import React from 'react'
import { Button, Input, Row, Col } from 'antd'
import { Container, StyledCreateButton } from './style'

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
          <Col span={6}>
            <Button
                type="primary"
                className="margin-right"
                disabled={true}
              >
                <div>検索</div>
            </Button>
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
