import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout, theme } from 'antd';

import './App.css';

import SidebarComponent from './components/SidebarComponent';
import FooterSection from './components/FooterSection';
import RouterComponent from './RouterComponent';

const { Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <SidebarComponent collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <RouterComponent/>
          </Content>
          <FooterSection />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
