import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeListPage from './Pages/EmployeeListPage/EmployeeListPage';
import AddEmployee from './Pages/AddEmployeePage/AddEmployeePage'; 

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeListPage />} />
                <Route path="/add-employee" element={<AddEmployee/>} />
            </Routes>
        </Router>
    );
};

export default App;
