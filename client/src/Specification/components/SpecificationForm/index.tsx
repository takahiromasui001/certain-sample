import React from 'react'
import { Formik, useField } from 'formik';
import { Form } from 'antd'
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
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  return (
    <Form
    form={form}
    {...layout}
    name="specification_form_in_modal"
    initialValues={{ modifier: '' }}
    size='middle'
  >
    <Form.Item
      name="name"
      label="仕様書名"
    >
      <Input className="text-input" />          
    </Form.Item>
    <Form.Item
      name="name"
      label="yeaksjdflkajdfklajlksfdj"
    >
      <Input className="text-input" />          
    </Form.Item>
  </Form>

    // <FormContainer>
    //   <Formik
    //     initialValues={initialValues}
    //     onSubmit={onSubmit}
    //     enableReinitialize={true}
    //   >
    //     <Form>
    //       <MyTextInput
    //         label="仕様書名"
    //         name="name"
    //         type="text"
    //       />
    //       <ButtonWrapper>
    //         <StyledButton type="primary" htmlType="submit">登録</StyledButton>
    //         <StyledButton onClick={onCancel}>キャンセル</StyledButton>
    //       </ButtonWrapper>
    //     </Form>
    //   </Formik>
    // </FormContainer>
  )
}

export default SpecificationForm
