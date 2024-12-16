import React, { useEffect } from "react";
import { Tabs, Button, Table, Card, Space, Popconfirm } from "antd";
import CreateTemplate from "./CreateTemplate";
import CreateTemplateType from "./CreateTemplateType";

const onChange = (key) => {
  console.log(key);
};

const TabContent = ({ tabKey }) => {
  const [templatesData, setTemplatesData] = React.useState([]);

  const handleDelete = (templateName) => {
    const templatesInfo = JSON.parse(localStorage.getItem("templatesInfo"));
    const filteredTemplates = templatesInfo.filter((template) => template.templateName !== templateName);
    localStorage.setItem('templatesInfo', JSON.stringify(filteredTemplates));
    setTemplatesData(JSON.parse(localStorage.getItem("templatesInfo")));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "templateName",
      sorter: (a, b) => a.templateName.length - b.templateName.length,
      sortDirections: ["descend"],
    },
    {
      title: "Sections",
      dataIndex: "values",
      sorter: (a, b) => a.values - b.values,
    },
    {
      title: "Actions",
      dataIndex: '',
      key: 'x',
      render: (_, record) =>
        templatesData.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.templateName)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    }
  ];

  useEffect(() => {
    // Fetch data from API
    console.log(JSON.parse(localStorage.getItem("templatesInfo")), 'JSON.parse(localStorage.getItem("templatesInfo"))')
    if (localStorage.getItem("templatesInfo")) {
      setTemplatesData(JSON.parse(localStorage.getItem("templatesInfo")));
    }
  }, [])

  if (tabKey === "Templates") {
    return (
      <Card
        title="Templates List"
        bordered={true}
        style={{ marginTop: 16 }}
      >
        {
          templatesData.length > 0 && <Table columns={columns} dataSource={templatesData} onChange={onChange} />
        }
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
