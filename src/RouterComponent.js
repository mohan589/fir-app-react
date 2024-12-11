import { Route, Routes } from "react-router-dom";

import Dashboard from './components/Dashboard';
import About from './components/About';
import NotFound from './components/NotFound';
import Templates from './components/Templates/Templates';
import FirInfo from './components/FirInfo';

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/templates" element={<Templates />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/firinfo" element={<FirInfo />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
}

export default RouterComponent;