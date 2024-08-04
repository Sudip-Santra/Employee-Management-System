import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmpListing from './EmpListing.js';
import EmpCreate from './EmpCreate.js';
import EmpDetail from './EmpDetail.js';

function App() {
  return (
    <div className="App">
      <h1>React JS CRUD Operations</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmpListing />} />
          <Route path="/employee/create" element={<EmpCreate />} />
          <Route path="/employee/detail/:empid" element={<EmpDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
