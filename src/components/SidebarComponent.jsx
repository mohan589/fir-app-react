import React from 'react';
import { Menu, Layout } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, CrownOutlined } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const { Sider } = Layout;

const items = [
  getItem(
    <Link to="/templates">Templates</Link>,
    '/templates',
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/firinfo">FirInfo</Link>,
    '/firinfo',
    <DesktopOutlined />
  ),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '/user/tom'),
    getItem('Bill', '/user/bill'),
    getItem('Alex', '/user/alex'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '/team/team1'),
    getItem('Team 2', '/team/team2'),
  ]),
  getItem('Admin Codes', 'AdminCodes', <CrownOutlined />, [
    getItem(
      <Link to="/districts">Districts</Link>,
      '/districts',
      <PieChartOutlined />
    ),
    getItem(
      <Link to="/stations">Stations</Link>,
      '/stations',
      <PieChartOutlined />
    ),
    getItem('Bill', '/user/bill'),
    getItem('Alex', '/user/alex'),
  ]),
  getItem(
    <Link to="/dashboard">Dashboard</Link>,
    '/dashboard',
    <FileOutlined />
  ),
];

const SidebarComponent = ({ collapsed, onCollapse }) => {
  const location = useLocation();

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]} // Dynamically set the selected key
        items={items}
      />
    </Sider>
  );
};

export default SidebarComponent;
