import React, { useState } from "react";
import { Tabs, Button, Table, Card } from "antd";
import FIRModelPopup from "../FirInfo/FIRModelPopup";
import FIRWorkflowComponent from "../FirInfo/FIRWorkflowComponent";
import TextExtract from "./TextExtract";
import Notice35App from "./Notice35";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ workFlowData, setWorkFlowData ] = useState([])

  if (tabKey === "All FIRs") {
    return (
      <Card
        title="All FIRs"
        bordered={true}
        style={{ marginTop: 16 }}
        extra=<Button onClick={() => setIsModalOpen(true)} type="primary">Create FIR</Button>
      >
        {
          workFlowData.length === 0 && <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            pagination={{ pageSize: 5 }}
          />
        }
        <FIRModelPopup setOpen={setIsModalOpen} open={isModalOpen} setWorkFlowData={setWorkFlowData} />
        {workFlowData?.length > 0 && <FIRWorkflowComponent workFlowData={workFlowData} />}
      </Card>
    );
  }
  if (tabKey === "New FIR") {
    return (
      <Card
        title="Add New FIR"
        bordered={true}
        style={{ marginTop: 16 }}
      >
        <TextExtract />
      </Card>
    );
  }
  return null;
};

const AllNotice = () => {
  const tabItems = [
    {
      key: "All FIRs",
      label: "All FIRs",
      children: <TabContent tabKey="All FIRs" />,
    },
    {
      key: "New FIR",
      label: "New FIR",
      children: <TabContent tabKey="New FIR" />,
    }
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <Tabs items={tabItems} />
      <Notice35App/>
    </div>
  );
};

export default AllNotice;
