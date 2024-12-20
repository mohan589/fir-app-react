import React from "react";
import { Button, Table, Card } from "antd";

import NewCircularComponent from "./NewCircularComponent";

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

const ListCirculars = ({ tabKey }) => {

  if (tabKey === "All Circulars") {
    return (
      <Card
        title="All Circulars"
        bordered={true}
        style={{ marginTop: 16 }}
      >
        
      </Card>
    );
  }
  if (tabKey === "Add New Circular") {
    return (
      <Card
        title="Add New Circular"
        bordered={true}
        style={{ marginTop: 16 }}
      >
        <NewCircularComponent />
      </Card>
    );
  }
  return null;
};

export default ListCirculars;
