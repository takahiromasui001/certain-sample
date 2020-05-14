import React, { ReactElement } from 'react'
import { Dropdown, Button, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

type TMemuButton = {
  onEditClick: () => void
  onCancelClick: () => void
}

const MenuButton: React.FC<TMemuButton> = (props) => {
  const { onEditClick, onCancelClick } = props

  const icon = (
    <div>
      <MenuOutlined style={{color: 'lightgray', fontSize: '15px'}} />
    </div>
  )
  const menu = (
    <Menu>
      <Menu.Item>
        <Button type='link' onClick={ onEditClick }>
          編集
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type='link' onClick={ onCancelClick }>
          削除
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <div style={{textAlign: 'center'}}>
      <Dropdown overlay={menu} >
        <Button size='middle' icon={icon} style={{ borderColor: '#FFF'}}/>
      </Dropdown>
    </div>
  )
}

export default MenuButton
