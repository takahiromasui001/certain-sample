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

const MySelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

interface IProductForm {
  onSubmit: any
  initialValues?: {
    name: string,
    type: number,
    productId: number,
  }
}

const type = { inner: 0, outer: 1, inner_finishing: 2, equipment: 3 }

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
          <MySelect label="仕様書タイプ" name="type">
            <option value={type.outer}>外部仕様書</option>
            <option value={type.inner}>内部仕様書</option>
            <option value={type.equipment}>住宅設備・その他</option>
            <option value={type.inner_finishing}>内部仕上げ表</option>
          </MySelect>
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
