import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout, theme } from 'antd';

import './App.css';

import SidebarComponent from './components/SidebarComponent';
import FooterSection from './components/FooterSection';
import RouterComponent from './RouterComponent';
import ErrorBoundary from './components/ErrorBoundary';
import UserProfile from './components/UserProfile';

const { Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout style={{ minHeight: '100vh' }}>
          <SidebarComponent collapsed={collapsed} onCollapse={setCollapsed} />
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: '0 16px' }}>
              <UserProfile/>
              <RouterComponent/>
            </Content>
            <FooterSection />
          </Layout>
          </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
