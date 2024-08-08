import React from 'react';
import { BrowserRouter as Router, Route, Routes } from  'react-router-dom';
import HomePage from './pages/HomePage';
import ViewDataPage from './pages/ViewDataPage'
import CreateDataPage from './pages/CreateDataPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view-data" element={<ViewDataPage />} />
        <Route path="/table" element={<HomePage />} />
        <Route path="/create-data" element={<CreateDataPage />} />
      </Routes>
    </Router>
  );
};

export default App;
