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
            label="First Name"
            name="name"
            type="text"
            placeholder="品名"
          />
          <MyTextInput
            label="Middle Name"
            name="maker"
            type="text"
            placeholder="メーカー"
          />
          <MyTextInput
            label="Last Name"
            name="price"
            type="text"
            placeholder="価格"
          />
          <button type="submit">登録</button>
        </Form>
      </Formik>
    </>
  )
}

export default ProductForm
