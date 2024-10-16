import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeListPage from './Pages/EmployeeListPage/EmployeeListPage';
import AddEmployeePage from './Pages/AddEmployeePage/AddEmployeePage';
import EditEmployeePage from './Pages/EditEmployeePage/EditEmployeePage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeListPage />} />
                <Route path="/add-employee" element={<AddEmployeePage />} />
                <Route path="/edit-employee/:userID" element={<EditEmployeePage />} />
            </Routes>
        </Router>
    );
};

export default App;
