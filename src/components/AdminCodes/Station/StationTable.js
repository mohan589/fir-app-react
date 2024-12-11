import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';

const StationTable = ({ districts, onEdit, onDelete }) => {
  return (
    <Table dataSource={districts} rowKey="id">
      <Column title="Name" dataIndex="name" />
      <Column title="State" dataIndex="state" />
      <Column title="Pin" dataIndex="pin" />
      <Column
        title="Actions"
        render={(text, record) => (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
            <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} type="danger" />
          </Space>
        )}
      />
    </Table>
  );
};

export default StationTable;
