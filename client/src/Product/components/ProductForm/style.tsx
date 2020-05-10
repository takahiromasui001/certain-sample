import styled from 'styled-components'
import { Button } from 'antd'

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
