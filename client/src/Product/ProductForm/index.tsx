import React from 'react'
import { Formik, Form, useField } from 'formik';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

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

const ProductForm: React.SFC = () => {
  let history = useHistory()
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          maker: '',
          price: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.post('http://localhost:3000/api/v1/products', {
              name: values.name,
              maker: values.maker,
              price: values.price
            })
            history.push('/products')
          } catch(error) {
            history.push('/products/new')
          }
        }}
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
