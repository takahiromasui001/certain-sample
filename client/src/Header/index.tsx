import React from 'react'
import { Layout } from 'antd'
const { Header: AntHeader } = Layout;

const Header: React.SFC = () => {
  return (
    <AntHeader className="header" style={{backgroundColor: '#fff', display: 'flex', justifyContent: 'flex-end'}}>
    <div className="logo-title" style={{height: '100%', marginRight: 'auto', display: 'flex'}}>
      <img src="/certain-logo.png" alt="" style={{height: '100%'}}/>
      <div style={{height: '100%', fontSize: 30}}>
        仕様書管理システム(仮)
      </div>
    </div>
    <div className="logo" style={{height: '100%', marginRight: 20}}>
      <img src="/bell.png" alt="" style={{height: '80%'}}/>
    </div>
    <div className="logo" style={{height: '100%'}}>
      <img src="/person.png" alt="" style={{height: '80%'}}/>
    </div>
  </AntHeader>
  )
}

export default Header
