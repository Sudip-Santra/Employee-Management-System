import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmpListing from './EmpListing.js';
import EmpCreate from './EmpCreate.js';
import EmpDetail from './EmpDetail.js';
import EmpEdit from './EmpEdit.js';

function App() {
  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <h5>Manage Your Employees Efficiently</h5>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmpListing />} />
          <Route path="/employee/create" element={<EmpCreate />} />
          <Route path="/employee/detail/:empid" element={<EmpDetail />} />
          <Route path="/employee/edit/:empid" element={<EmpEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
