import React, { useEffect } from 'react'
import { Modal, Form } from 'antd'
import { Input as StyledInput } from 'src/shared/components/FormStyle'

type TProductFormModal = {
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

const ProductFormModal: React.FC<TProductFormModal> = (props) => {
  const { visible, onCreate, onEdit, onCancel, initialValue, modalType } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ name: initialValue.name, maker: initialValue.maker, price: initialValue.price })
  } , [initialValue, form]);

  return (
    <Modal
      visible={visible}
      width={720}
      title="商品作成"
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
          label="商品名"
        >
          <StyledInput className="text-input" />          
        </Form.Item>
        <Form.Item
          name="maker"
          label="メーカー"
        >
          <StyledInput className="text-input" />          
        </Form.Item>
        <Form.Item
          name="price"
          label="単価"
        >
          <StyledInput className="text-input" />          
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ProductFormModal
