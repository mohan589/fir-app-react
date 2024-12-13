import React, { useState } from "react";
import { Menu, Dropdown, Avatar, Button } from "antd";
import { UserOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";

const UserProfileToggle = () => {
  const [userName] = useState("John Doe");

  // Menu items for the dropdown
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <a href="/profile">View Profile</a>
      </Menu.Item>
      <Menu.Item key="settings" icon={<UserOutlined />}>
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: 1000,
      }}
    >
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="text" onClick={(e) => e.preventDefault()} style={{ padding: 0 }}>
          <Avatar size="large" style={{ marginRight: 8, backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          {userName} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserProfileToggle;
