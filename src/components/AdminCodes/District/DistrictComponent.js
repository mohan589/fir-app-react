import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, Form } from 'antd';
import DistrictTable from './DistrictTable';
import DistrictForm from './DistrictForm';

const DistrictComponent = () => {
  const [districts, setDistricts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [form] = Form.useForm();

  // Simulate fetching districts from an API (You can replace this with an actual API call)
  useEffect(() => {
    const fetchDistricts = () => {
      setDistricts([
        { id: 1, name: 'District 1', state: 'State 1', pin: '10001' },
        { id: 2, name: 'District 2', state: 'State 2', pin: '10002' },
      ]);
    };
    fetchDistricts();
  }, []);

  const handleSubmit = (values) => {
    if (isEditing) {
      // Edit an existing district
      setDistricts(
        districts.map((district) =>
          district.id === currentDistrict.id ? { ...district, ...values } : district
        )
      );
    } else {
      // Create a new district
      const newDistrict = { id: Date.now(), ...values };
      setDistricts([...districts, newDistrict]);
    }
    setIsModalVisible(false);
    form.resetFields(); // Reset form fields after submit
  };

  const handleEdit = (district) => {
    setIsEditing(true);
    setCurrentDistrict(district);
    form.setFieldsValue(district); // Populate form with existing district data
    setIsModalVisible(true);
  };

  const handleDelete = (districtId) => {
    setDistricts(districts.filter((district) => district.id !== districtId));
  };

  const handleCreate = () => {
    setIsEditing(false); // Set flag for new district
    setCurrentDistrict(null); // Reset current district
    form.resetFields(); // Clear form fields
    setIsModalVisible(true); // Show modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Clear form fields when canceling
  };

  return (
    <div style={{marginTop: '20px'}}>
      {/* Render the content inside a Card */}
      <Card
        title="District Management"
        bordered={false}
        style={{ width: '100%' }}
        extra={
          <Button
            type="primary"
            onClick={handleCreate}
            style={{ marginBottom: 16, float: 'right' }}
          >
            Add District
          </Button>
        }
      >
        {/* District Table */}
        <DistrictTable
          districts={districts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Modal for Create/Edit district */}
      <Modal
        title={isEditing ? 'Edit District' : 'Create District'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <DistrictForm
          form={form}
          onSubmit={handleSubmit}
          isEditing={isEditing}
          initialValues={currentDistrict}
        />
      </Modal>
    </div>
  );
};

export default DistrictComponent;
