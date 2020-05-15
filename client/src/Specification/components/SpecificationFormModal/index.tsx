import React, { useEffect } from 'react'
import { Modal, Form, Select } from 'antd'
import { Input as StyledInput } from 'src/shared/components/FormStyle'

const { Option } = Select

type TSpecificationFormModal = {
  visible: boolean
  onCreate: (values: any) => void
  onEdit: (values: any) => void
  onCancel: () => void
  initialValue: any
  modalType: string
  employees: any[]
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const SpecificationFormModal: React.FC<TSpecificationFormModal> = (props) => {
  const { visible, onCreate, onEdit, onCancel, initialValue, modalType, employees } = props
  const [form] = Form.useForm()
  const statuses: { label: string, id: string }[] = [
    { label: '新規', id: 'start' },
    { label: '完了', id: 'completed' },
  ]
  const methods: { label: string, id: string }[] = [
    { label: '従来工法', id: 'conventional' },
    { label: '2×4', id: 'two_by_four' },
  ]

  const statusList = statuses.map( (status: { label: string, id: string }) => 
    <Option key={status.id} value={status.id}>{status.label}</Option>
  )
  const methodList = methods.map( (method: { label: string, id: string }) =>
    <Option key={method.id} value={method.id}>{method.label}</Option>
  )
  const employeeList = employees.map( (employee: { label: string, id: string }) => 
  <Option key={employee.id} value={employee.id}>{employee.label}</Option>
)

  useEffect(() => {
    form.setFieldsValue({ 
      name: initialValue.name, status: initialValue.status, constructionMethod: initialValue.constructionMethod, amount: initialValue.amount
    })
  } , [initialValue, form]);

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
        <Form.Item
          name="status"
          label="ステータス"
        >
          <Select style={{ width: "100%" }}>
            {statusList}
          </Select>
        </Form.Item>
        <Form.Item
          name="employee"
          label="担当者"
        >
          <Select style={{ width: "100%" }}>
            {employeeList}
          </Select>
        </Form.Item>
        <Form.Item
          name="constructionMethod"
          label="工法"
        >
          <Select style={{ width: "100%" }}>
            {methodList}
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="金額"
        >
          <StyledInput className="text-input" />          
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SpecificationFormModal
