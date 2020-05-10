import React from 'react'
import { Formik, Form, useField } from 'formik';
import { FormContainer, FormItemWrapper, Input, Label, ButtonWrapper, StyledButton } from 'src/shared/components/FormStyle'

const MyTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)
  return (
    <FormItemWrapper>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </FormItemWrapper>
  )
}

interface IProductForm {
  onSubmit: any
  onCancel: any
  initialValues?: {
    name: string,
  }
}

const SpecificationForm: React.SFC<IProductForm> = props => {
  const { initialValues = { name: '' }, onSubmit, onCancel } = props

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form>
          <MyTextInput
            label="仕様書名"
            name="name"
            type="text"
          />
          <ButtonWrapper>
            <StyledButton type="primary" htmlType="submit">登録</StyledButton>
            <StyledButton onClick={onCancel}>キャンセル</StyledButton>
          </ButtonWrapper>
        </Form>
      </Formik>
    </FormContainer>
  )
}

export default SpecificationForm
