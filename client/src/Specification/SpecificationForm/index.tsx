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
    updatedAt: string,
  }
}

const SpecificationForm: React.SFC<IProductForm> = props => {
  const { initialValues = { name: '', updatedAt: '' }, onSubmit } = props

  return (
    <>
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
          <button type="submit">登録</button>
        </Form>
      </Formik>
    </>
  )
}

export default SpecificationForm
