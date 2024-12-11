import React from "react";
import { Tabs, Button, Table, Card } from "antd";
import CreateTemplate from "./CreateTemplate";
import CreateTemplateType from "./CreateTemplateType";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const onChange = (key) => {
  console.log(key);
};

const TabContent = ({ tabKey }) => {
  if (tabKey === "Templates") {
    return (
      <Card
        title="Templates List"
        bordered={true}
        style={{ marginTop: 16 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    );
  }
  if (tabKey === "New Template") {
    return (
      <Card
        title="Create New Template"
        bordered={true}
        style={{ marginTop: 16 }}
      >
        <CreateTemplate />
      </Card>
    );
  }
  if (tabKey === "CreateTemplateType") {
    return (
      <Card
        title="Create Template Type"
        bordered={true}
        style={{ marginTop: 16 }}
      >
        <CreateTemplateType />
      </Card>
    );
  }
  return null;
};

const TemplateTabs = () => {
  const tabItems = [
    {
      key: "Templates",
      label: "Templates",
      children: <TabContent tabKey="Templates" />,
    },
    {
      key: "New Template",
      label: "Create Template",
      children: <TabContent tabKey="New Template" />,
    },
    {
      key: "CreateTemplateType",
      label: "Create Template Type",
      children: <TabContent tabKey="CreateTemplateType" />,
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <Tabs
        items={tabItems}
        more={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button>All Templates</Button>
            <Button type="primary">Create Template</Button>
          </div>
        }
      />
    </div>
  );
};

export default TemplateTabs;
