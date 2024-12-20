import { Route, Routes } from "react-router-dom";

import Dashboard from './components/Dashboard';
import About from './components/About';
import NotFound from './components/NotFound';
import Templates from './components/Templates/Templates';
import FirInfo from './components/FirInfo';
import DistrictComponent from "./components/AdminCodes/District/DistrictComponent";
import StationComponent from "./components/AdminCodes/Station/StationComponent";
import CircularTabs from "./components/AllCirculars/CircularTabs";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/templates" element={<Templates />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/firinfo" element={<FirInfo />} />
      <Route path="/about" element={<About />} />
      <Route path="/districts" element={<DistrictComponent />} />
      <Route path="/stations" element={<StationComponent />} />
      <Route path="/allCirculars" element={<CircularTabs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouterComponent;