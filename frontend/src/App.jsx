import React from 'react';
import { BrowserRouter as Router, Route, Routes } from  'react-router-dom';
import HomePage from './pages/HomePage';
import DataTablePage from './pages/DataTablePage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/table" element={<DataTablePage />} />
      </Routes>
    </Router>
  );
};

export default App;
