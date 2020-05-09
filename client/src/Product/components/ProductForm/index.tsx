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
  initialValues?: { name: string, maker: string, price: string }
}

const ProductForm: React.SFC<IProductForm> = props => {
  const { initialValues = { name: '', maker: '', price: '' }, onSubmit } = props

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form>
          <MyTextInput
            label="品名"
            name="name"
            type="text"
          />
          <MyTextInput
            label="メーカー"
            name="maker"
            type="text"
          />
          <MyTextInput
            label="単価"
            name="price"
            type="text"
          />
          <button type="submit">登録</button>
        </Form>
      </Formik>
    </>
  )
}

export default ProductForm
