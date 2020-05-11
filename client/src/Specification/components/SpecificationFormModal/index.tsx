import React from 'react'
import { Button, Modal, Form, Input } from 'antd'

type Values = {
  name: string
}

type TSpecificationFormModal = {
  visible: boolean
  onCreate: (values: any) => void
  onCancel: () => void
}

const SpecificationFormModal: React.FC<TSpecificationFormModal> = (props) => {
  const { visible, onCreate, onCancel } = props

  const [form] = Form.useForm()
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <div>TEST!!!!!!!!!!</div>
    </Modal>
  )
}

export default SpecificationFormModal
