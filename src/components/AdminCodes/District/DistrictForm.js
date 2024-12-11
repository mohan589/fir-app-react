import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';

const { Option } = Select;

const DistrictForm = ({ form, onSubmit, isEditing, initialValues }) => {
  return (
    <Form
      form={form}
      name="districtForm"
      onFinish={onSubmit}
      initialValues={{
        ...initialValues,
        state: initialValues?.state || 'Telangana', // Set default state as Telangana
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="District Name"
            rules={[{ required: true, message: 'Please enter the district name!' }]}
          >
            <Input placeholder="Enter district name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'Please select the state!' }]}
          >
            <Select placeholder="Select a state">
              <Option value="Telangana">Telangana</Option>
              <Option value="Andhra Pradesh">Andhra Pradesh</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="pin"
            label="PinCode"
            rules={[{ required: true, message: 'Please enter the pin code!' }]}
          >
            <Input placeholder="Enter pin code" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? 'Update District' : 'Create District'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DistrictForm;
