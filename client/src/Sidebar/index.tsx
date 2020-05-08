import React from 'react'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

const Sidebar: React.FC = () => {
  return (
    <Sider width={200}>
      <Menu
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0,backgroundColor: '#F1F2F5' }}
      >
        <Menu.Item key="1">
          <img src="/home.png" alt="" style={{height: '60%', marginRight: 5}}/>
          仕様書管理
        </Menu.Item>
        <Menu.Item key="2">
          <img src="/people.png" alt="" style={{height: '60%', marginRight: 5}}/>
          顧客管理
        </Menu.Item>
        <Menu.Item key="3">
          <img src="/furniture.png" alt="" style={{height: '60%', marginRight: 5}}/>
          商品管理
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
