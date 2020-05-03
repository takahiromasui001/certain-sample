import React from 'react'
import { Formik, Form, useField } from 'formik';
import { useHistory } from 'react-router-dom'
import axios, { AxiosResponse }  from 'axios'

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
          console.log(values.name)
          console.log(values.maker)
          console.log(values.price)

          try {
            const response: AxiosResponse = await axios.post('/products', {
              name: values.name,
              maker: values.maker,
              price: values.price
            })
            console.log("success")
            history.push('/products')
          } catch(error) {
            console.log("error")
            history.push('/products/new')
          } finally {
            console.log("finaly")
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
