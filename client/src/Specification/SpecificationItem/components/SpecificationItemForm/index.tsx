import React from 'react'
import { Formik, Form, useField } from 'formik';
import { FormContainer, FormItemWrapper, Input, Select, Label, ButtonWrapper, StyledButton } from 'src/shared/components/FormStyle'

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

const MySelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <FormItemWrapper>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </FormItemWrapper>
  );
};

interface IProductForm {
  onSubmit: any
  onCancel: any
  products: any[]
  initialValues?: {
    name: string,
    type: string,
    productId: string,
  }
}

const type = { inner: '0', outer: '1', inner_finishing: '2', equipment: '3' }

const SpecificationItemForm: React.SFC<IProductForm> = props => {
  const { initialValues = { name: '', type: 0, productId: 1 }, onSubmit, onCancel, products } = props
  const productList = products.map( (product: { label: string, id: string}) => (
    <option key={product.id} value={product.id}>{product.label}</option>
  ))

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form>
          <MyTextInput
            label="項目名"
            name="name"
            type="text"
          />
          <MySelect label="仕様書タイプ" name="type">
            <option value={type.outer}>外部仕様書</option>
            <option value={type.inner}>内部仕様書</option>
            <option value={type.equipment}>住宅設備・その他</option>
            <option value={type.inner_finishing}>内部仕上げ表</option>
          </MySelect>
          <MySelect label="プロダクト" name="productId">
            {productList}
          </MySelect>
          <ButtonWrapper>
            <StyledButton type="primary" htmlType="submit">登録</StyledButton>
            <StyledButton onClick={onCancel}>キャンセル</StyledButton>
          </ButtonWrapper>
        </Form>
      </Formik>
    </FormContainer>
  )
}

export default SpecificationItemForm
