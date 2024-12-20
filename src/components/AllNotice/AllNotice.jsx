import React, { useState } from "react";
import { Tabs, Button, Table, Card } from "antd";
import FIRWorkflowComponent from "../FirInfo/FIRWorkflowComponent";
import TextExtract from "./TextExtract";
import Notice35App from "./Notice35";
import ImageToPDF from "./ImageToPDF";
import NewNoticeModelPopup from "./NewNoticeModelPopup";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Sections",
    dataIndex: "sections",
    sorter: (a, b) => a.sections - b.sections,
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    sections: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    sections: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    sections: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    sections: 32,
    address: "London No. 2 Lake Park",
  },
];

const onChange = (key) => {
  console.log(key);
};

const TabContent = ({ tabKey }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ workFlowData, setWorkFlowData ] = useState([])

  if (tabKey === "All Notices") {
    return (
      <Card
        title="All Notices"
        bordered={true}
        style={{ marginTop: 16 }}
        extra=<Button onClick={() => setIsModalOpen(true)} type="primary">Add New Notice</Button>
      >
        {
          workFlowData.length === 0 && <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            pagination={{ pageSize: 5 }}
          />
        }
        <NewNoticeModelPopup setOpen={setIsModalOpen} open={isModalOpen} setWorkFlowData={setWorkFlowData} />
        {workFlowData?.length > 0 && <FIRWorkflowComponent workFlowData={workFlowData} />}
      </Card>
    );
  }
  if (tabKey === "Add Notice") {
    return (
      <Card
        title="Add Add Notice"
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
      key: "All Notices",
      label: "All Notices",
      children: <TabContent tabKey="All Notices" />,
    },
    {
      key: "Add Notice",
      label: "Add Notice",
      children: <TabContent tabKey="Add Notice" />,
    }
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <Tabs items={tabItems} />
      {/* <Notice35App/> */}
      <ImageToPDF/>
    </div>
  );
};

export default AllNotice;
