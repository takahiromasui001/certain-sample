import React, { useEffect } from 'react'
import { Modal, Form } from 'antd'
import { Input as StyledInput } from 'src/shared/components/FormStyle'

type TSpecificationFormModal = {
  visible: boolean
  onCreate: (values: any) => void
  onEdit: (values: any) => void
  onCancel: () => void
  initialValue: any
  modalType: string
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const SpecificationFormModal: React.FC<TSpecificationFormModal> = (props) => {
  const { visible, onCreate, onEdit, onCancel, initialValue, modalType } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ name: initialValue.name })
  } , [initialValue]);

  return (
    <Modal
      visible={visible}
      width={720}
      title="仕様書作成"
      okText="登録"
      cancelText="キャンセル"
      onCancel={() => {
        onCancel()
        // form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            // form.resetFields();
            modalType === 'edit' ? onEdit(values) : onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      destroyOnClose={true}
    >
      <Form
        form={form}
        {...layout}
        name="specification_form_in_modal"
        initialValues={ initialValue }
        size='middle'
      >
        <Form.Item
          name="name"
          label="仕様書名"
        >
          <StyledInput className="text-input" />          
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SpecificationFormModal
