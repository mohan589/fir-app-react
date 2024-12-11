import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, theme } from 'antd';
import SidebarComponent from './components/SidebarComponent';
import FooterSection from './components/FooterSection';
import Dashboard from './components/Dashboard';
import About from './components/About';
import NotFound from './components/NotFound';

import './App.css';
import Templates from './components/Templates/Templates';
import FirInfo from './components/FirInfo';

const { Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <SidebarComponent collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <Routes>
              <Route path="/templates" element={<Templates />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/firinfo" element={<FirInfo />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
          <FooterSection />
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
