import React, { useCallback } from 'react'
import { Layout, Menu } from 'antd'
import { useHistory } from 'react-router-dom'

const { Sider } = Layout

const Sidebar: React.FC = () => {
  let history = useHistory()

  const redirectToPage = useCallback((url: string) => {
    history.push(url)
  }, [history])

  return (
    <Sider width={200}>
      <Menu
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0,backgroundColor: '#F1F2F5' }}
      >
        <Menu.Item key="1" onClick={() => { redirectToPage('/specifications') }}>
          <img src="/home.png" alt="" style={{height: '60%', marginRight: 5}}/>
          仕様書管理
        </Menu.Item>
        <Menu.Item key="2" onClick={() => { redirectToPage('/products') }}>
          <img src="/furniture.png" alt="" style={{height: '60%', marginRight: 5}}/>
          商品管理
        </Menu.Item>
        <Menu.Item key="3" disabled={true}>
          <img src="/people.png" alt="" style={{height: '60%', marginRight: 5}}/>
          顧客管理
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
