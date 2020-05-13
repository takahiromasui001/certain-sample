import React, { useEffect } from 'react'
import { Modal, Form, Select } from 'antd'
import { Input as StyledInput } from 'src/shared/components/FormStyle'

const { Option } = Select

type TSpecificationItemFormModal = {
  products: any[]
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

const SpecificationItemFormModal: React.FC<TSpecificationItemFormModal> = (props) => {
  const { products, visible, onCreate, onEdit, onCancel, initialValue, modalType } = props
  const typeList: {[index: string]:any} = { inner: 0, outer: 1, equipment: 3, inner_finishing: 2 }
  const typeLabel: {[index: string]:any} = { inner: '内部仕様書', outer: '外部仕様書', equipment: '住宅設備・その他', inner_finishing: '内部仕上げ表' }
  const types: {label: string, id: number}[] = [
    { label: '内部仕様書', id: 0 },
    { label: '外部仕様書', id: 1 },
    { label: '住宅設備・その他', id: 3 },
    { label: '内部仕上げ表', id: 2 },
  ]
  const productList = products.map( (product: { label: string, id: string}) => (
    <option key={product.id} value={product.id}>{product.label}</option>
  ))
  const specificationTypeList = types.map( (type: { label: string, id: number}) => (
    <option key={type.id} value={type.id}>{type.label}</option>
  ))

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ name: initialValue.name, type: typeList[initialValue.type], productId: initialValue.productId})
  } , [initialValue]);

  return (
    <Modal
      visible={visible}
      width={720}
      title="仕様書項目作成"
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
        <Form.Item
          name="type"
          label="仕様書タイプ"
        >
          {/* <Select defaultValue={type.inner} style={{ width: "100%" }}> */}
          <Select style={{ width: "100%" }}>
            {specificationTypeList}
          </Select>
        </Form.Item>
        <Form.Item
          name="productId"
          label="商品"
        >
          {/* <Select defaultValue={products.length !== 0 ? products[0].id : 'id'} style={{ width: "100%" }}> */}
          <Select style={{ width: "100%" }}>
            {productList}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SpecificationItemFormModal
