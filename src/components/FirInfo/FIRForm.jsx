import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Input, Select, Button, DatePicker, Row, Col } from "antd";
import PhysicalFeaturesTable from "./PhysicalFeaturesTable";

const FIRForm = forwardRef(({ props, firFormRef }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const handleFinish = (values) => {
    console.log("Form Values:", values);
  };

  // Expose the method to the parent via ref
  useImperativeHandle(firFormRef, () => ({
    submitForm: () => {
      form.submit(); // Triggers the onFinish handler
    },
  }));

  return (
    <Form
      ref={firFormRef}
      form={form}
      id="firFormFromApp"
      name="FirForm"
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: "1200px", margin: "auto" }}
    >
      <h2>First Information Report (FIR)</h2>

      {/* Section 1: General Information */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="District" name="district" rules={[{ required: true }]}>
            <Input placeholder="Enter district" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Police Station (P.S)" name="policeStation" rules={[{ required: true }]}>
            <Input placeholder="Enter police station" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Year" name="year" rules={[{ required: true }]}>
            <Input placeholder="Enter year" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Acts & Sections" name="actsSections">
            <Input placeholder="Enter acts and sections" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="FIR Number" name="firNumber">
            <Input placeholder="Enter FIR number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Section 2: Occurrence Details */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Date & Time From"
            name="dateTimeFrom"
            rules={[{ required: true }]}
          >
            <DatePicker showTime placeholder="Select date & time" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Date & Time To" name="dateTimeTo">
            <DatePicker showTime placeholder="Select date & time" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Date of Entry" name="dateOfEntry">
            <DatePicker showTime placeholder="Select date & time" />
          </Form.Item>
        </Col>
      </Row>

      {/* Section 3: Place of Occurrence */}
      <h3>Place of Occurrence</h3>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="House No." name="houseNo">
            <Input placeholder="Enter house number" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Street/Village" name="street">
            <Input placeholder="Enter street or village" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="City/District" name="city">
            <Input placeholder="Enter city or district" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="State" name="state">
            <Input placeholder="Enter state" />
          </Form.Item>
        </Col>
      </Row>

      {/* Section 4: Complainant/Informant Details */}
      <h3>Complaint / Informant Details</h3>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Name" name="complainantName" rules={[{ required: true }]}>
            <Input placeholder="Enter name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Father's/Husband's Name"
            name="complainantRelationName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter father's or husband's name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Date of Birth"
            name="complainantDob"
            rules={[{ required: true }]}
          >
            <DatePicker placeholder="Select date" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Age" name="complainantAge">
            <Input placeholder="Enter age" type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Nationality" name="complainantNationality">
            <Input placeholder="Enter nationality" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Caste" name="complainantCaste">
            <Input placeholder="Enter caste" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Passport Number" name="complainantPassportNumber">
            <Input placeholder="Enter passport number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Date of Issue" name="complainantPassportIssueDate">
            <DatePicker showTime placeholder="Select date" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Place of Issue" name="complainantPassportPlace">
            <Input placeholder="Enter place of issue" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Occupation" name="complainantOccupation">
            <Input placeholder="Enter occupation" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Mobile Number" name="complainantMobile">
            <Input placeholder="Enter mobile number" type="tel" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Email" name="complainantEmail">
            <Input placeholder="Enter Email" type="email" />
          </Form.Item>
        </Col>
      </Row>
      <h4>Address</h4>
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item label="House No." name="complainantHouseNo">
            <Input placeholder="Enter house number" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Area/Mandal" name="complainantArea">
            <Input placeholder="Enter area/mandal" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Street/Village" name="complainantStreet">
            <Input placeholder="Enter street/village" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="City/District" name="complainantCity">
            <Input placeholder="Enter city/district" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="State" name="complainantState">
            <Input placeholder="Enter state" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="PIN" name="complainantPin">
            <Input placeholder="Enter PIN" type="number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Section 5: Suspect Details */}
      <h3>Details of Known/Suspected/unknown accused with full particulars</h3>
      <Form.List name="suspects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} style={{ marginBottom: "20px" }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Name"
                      name={[name, "name"]}
                      fieldKey={[fieldKey, "name"]}
                      rules={[{ required: true, message: "Missing name" }]}
                    >
                      <Input placeholder="Enter name" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Father's/Husband's Name"
                      name={[name, "relationName"]}
                      fieldKey={[fieldKey, "relationName"]}
                    >
                      <Input placeholder="Enter father's or husband's name" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Date of Birth"
                      name={[name, "dob"]}
                      fieldKey={[fieldKey, "dob"]}
                    >
                      <DatePicker placeholder="Select date" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      label="Occupation"
                      name={[name, "occupation"]}
                      fieldKey={[fieldKey, "occupation"]}
                    >
                      <Input placeholder="Enter Occupation" type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      label="Caste"
                      name={[name, "caste"]}
                      fieldKey={[fieldKey, "caste"]}
                    >
                      <Input placeholder="Enter Caste" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Age"
                      name={[name, "age"]}
                      fieldKey={[fieldKey, "age"]}
                    >
                      <Input placeholder="Enter age" type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Nationality"
                      name={[name, "nationality"]}
                      fieldKey={[fieldKey, "nationality"]}
                    >
                      <Input placeholder="Enter nationality" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Gender"
                      name={[name, "gender"]}
                      fieldKey={[fieldKey, "gender"]}
                    >
                      <Select placeholder="Select gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Passport Number"
                      name={[name, "passportNumber"]}
                      fieldKey={[fieldKey, "passportNumber"]}
                    >
                      <Input placeholder="Enter passport number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Date of Issue"
                      name={[name, "passportIssueDate"]}
                      fieldKey={[fieldKey, "passportIssueDate"]}
                    >
                      <DatePicker showTime placeholder="Select date & time" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Place of Issue"
                      name={[name, "passportPlace"]}
                      fieldKey={[fieldKey, "passportPlace"]}
                    >
                      <Input placeholder="Enter place of issue" />
                    </Form.Item>
                  </Col>
                </Row>
                <h4>Address</h4>
                <Row gutter={16}>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      label="House No."
                      name={[name, "houseNo"]}
                      fieldKey={[fieldKey, "houseNo"]}
                    >
                      <Input placeholder="Enter house number" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      label="Area/Mandal"
                      name={[name, "area"]}
                      fieldKey={[fieldKey, "area"]}
                    >
                      <Input placeholder="Enter area/mandal" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      label="Street/Village"
                      name={[name, "street"]}
                      fieldKey={[fieldKey, "street"]}
                    >
                      <Input placeholder="Enter street/village" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      label="City/District"
                      name={[name, "city"]}
                      fieldKey={[fieldKey, "city"]}
                    >
                      <Input placeholder="Enter city/district" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      label="State"
                      name={[name, "state"]}
                      fieldKey={[fieldKey, "state"]}
                    >
                      <Input placeholder="Enter state" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      label="PIN"
                      name={[name, "pin"]}
                      fieldKey={[fieldKey, "pin"]}
                    >
                      <Input placeholder="Enter PIN" type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Button danger onClick={() => remove(name)}>
                  Remove Suspect
                </Button>
              </div>
            ))}
            <Button type="dashed" onClick={() => add()}>
              Add Suspect
            </Button>
          </>
        )}
      </Form.List>
      <br />
      <br />
      <PhysicalFeaturesTable/>
      <br />
      <br />
      
      {/* Section 6: Submit */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit FIR
        </Button>
      </Form.Item>
  </Form>)
});

export default FIRForm;
