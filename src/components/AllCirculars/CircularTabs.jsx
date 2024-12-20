import { Tabs } from "antd";
import ListCirculars from "./ListCirculars";
import ImageToPDF from "./ImageToPDF";

const CircularTabs = () => {
  const tabItems = [
    {
      key: "All Circulars",
      label: "All Circulars",
      children: <ListCirculars tabKey="All Circulars" />,
    },
    {
      key: "Add New Circular",
      label: "Add New Circular",
      children: <ListCirculars tabKey="Add New Circular" />,
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

export default CircularTabs;