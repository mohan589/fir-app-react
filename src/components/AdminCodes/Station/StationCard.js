import React from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const StationCard = ({ district, onEdit, onDelete }) => {
  return (
    <Card title={district.name} style={{ width: 300, marginBottom: 16 }}>
      <p><strong>State:</strong> {district.state}</p>
      <p><strong>Pin:</strong> {district.pin}</p>
      <Space>
        <Button icon={<EditOutlined />} onClick={() => onEdit(district)} />
        <Button icon={<DeleteOutlined />} onClick={() => onDelete(district.id)} type="danger" />
      </Space>
    </Card>
  );
};

export default StationCard;
