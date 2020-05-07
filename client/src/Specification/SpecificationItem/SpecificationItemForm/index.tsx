import React from 'react'
import { Formik, Form, useField } from 'formik';

const MyTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

interface IProductForm {
  onSubmit: any
  initialValues?: {
    name: string,
    type: number,
    productId: number,
  }
}

const SpecificationItemForm: React.SFC<IProductForm> = props => {
  const { initialValues = { name: '', type: 0, productId: 1 }, onSubmit } = props

  return (
    <>
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
          <MyTextInput
            label="仕様書タイプ"
            name="type"
            type="text"
          />
          <MyTextInput
            label="プロダクト"
            name="productId"
            type="text"
          />
          <button type="submit">登録</button>
        </Form>
      </Formik>
    </>
  )
}

export default SpecificationItemForm
