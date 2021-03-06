import React, { useEffect, useState } from 'react'
import { Modal, Form, Select, Button, Checkbox  } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Input as StyledInput } from 'src/shared/components/FormStyle'
import useProductColorList from '../../hooks/useProductColorList'

const { Option } = Select

type TSpecificationItemFormModal = {
  products: any[]
  visible: boolean
  onCreate: (values: any) => void
  onEdit: (values: any) => void
  onCancel: () => void
  initialValue: { name: string, type: string, productId: string, colorId: string, productCandidate: string[], customize: boolean }
  modalType: string
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  buttonCol: { span: 3 },
}

const SpecificationItemFormModal: React.FC<TSpecificationItemFormModal> = (props) => {
  const { products, visible, onCreate, onEdit, onCancel, initialValue, modalType } = props
  const { productColors, getProductColor } = useProductColorList(initialValue.productId)
  const [form] = Form.useForm()
  const [customize, setCustomize] = useState(true)

  useEffect(() => {
    form.setFieldsValue({ name: initialValue.name, type: initialValue.type, productId: initialValue.productId, colorId: initialValue.colorId, productCandidate: initialValue.productCandidate, customize: initialValue.customize })
    setCustomize(initialValue.customize)
  } , [initialValue, form]);

  const types: { label: string, id: string }[] = [
    { label: '内部仕様書', id: 'inner' },
    { label: '外部仕様書', id: 'outer' },
    { label: '住宅設備・その他', id: 'equipment' },
    { label: '内部仕上げ表', id: 'inner_finishing' },
  ]
  const productList = products.map( (product: { label: string, id: string }) => 
    <Option key={product.id} value={product.id}>{product.label}</Option>
  )
  const specificationTypeList = types.map( (type: { label: string, id: string }) =>
    <Option key={type.id} value={type.id}>{type.label}</Option>
  )
  const productColorList: any = productColors.map((color: { label: string, id: string}) =>
    <Option key={color.id} value={color.id}>{color.label}</Option>
  )

  const selectProduct = ( value: any ) => getProductColor(value, form)
  const toggleCustomize = (e: any) => {
    e.target.checked ? setCustomize(true) : setCustomize(false)
  }

  return (
    <Modal
      destroyOnClose={true}
      visible={visible}
      width={720}
      title="仕様書項目作成"
      okText="登録"
      cancelText="キャンセル"
      onCancel={() => {
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            modalType === 'edit' ? onEdit(values) : onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        {...layout}
        name="specification_form_in_modal"
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
          <Select style={{ width: "100%" }}>
            {specificationTypeList}
          </Select>
        </Form.Item>
        <Form.Item
          name="productId"
          label="商品"
        >
          <Select style={{ width: "100%" }} onChange={selectProduct}>
            {productList}
          </Select>
        </Form.Item>
        <Form.Item
          name="colorId"
          label="カラー"
        >
          <Select style={{ width: "100%" }}>
            {productColorList}
          </Select>
        </Form.Item>
        <Form.Item
          name="customize"
          label="カスタマイズ"
          valuePropName="checked"
        >
          <Checkbox onChange={toggleCustomize}/>
        </Form.Item>
        <div style={customize ? {display: 'inline'} : {display: 'none'}}>
          <Form.List name="productCandidate">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field, index) => (
                    <div style={{position: 'relative'}}>
                      <Form.Item
                        name={`productId${field.key}`}
                        label='カスタマイズ商品'
                        {...field}
                      >
                        <Select>
                          {productList}
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{position: 'absolute', right: '60px', top: '10px'}}
                      />
                    </div>
                  ))}
                    <div style={{ textAlign: 'center' }}>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: "80%" }}
                      >
                        追加
                      </Button>
                    </div>
                </>
              )
            }}
          </Form.List>
        </div>
      </Form>
    </Modal>
  )
}

export default SpecificationItemFormModal
