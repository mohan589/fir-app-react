import React from 'react';
import { Menu, Layout } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const {  Sider } = Layout;

const items = [
  getItem((
    <a href="/templates" rel="noopener noreferrer">
      Templates
    </a>
  ), '1', <PieChartOutlined />),
  getItem(<a href="/firinfo" rel="noopener noreferrer">
    FirInfo
  </a>, '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem(<a href="/dashboard" rel="noopener noreferrer">
    Dashboard
  </a>, '9', <FileOutlined />),
];

const SidebarComponent = ({ collapsed, onCollapse }) => {
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};

export default SidebarComponent;
