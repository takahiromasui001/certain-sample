import styled from 'styled-components'
import { Button, Select as AntdSelect } from 'antd'

export const FormContainer = styled.div`
  width: 93%;
  padding: 30px 0px;
`

export const FormItemWrapper = styled.div`
  margin-bottom: 25px;
`

export const Input = styled.input`
  width: calc(100% - 100px);
`

export const Select = styled.select`
  width: calc(100% - 100px);
  background-color: #fff;
  height: 32px;
  padding: 0 11px;
  border: 1px solid #d9d9d9;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  background-image: url(/angle-down.svg);
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: right 10px center;
`

export const Label = styled.label`
  display: inline-block;
  width: 100px;
  text-align: center;
`

export const ButtonWrapper = styled.div`
  text-align: right;
  margin-top: 30px;
`

export const StyledButton = styled(Button)`
  margin-left: 10px;
`
