import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './App.css';
import NewEmployeeForm from './Pages/AddEmployeePage/AddEmployeePage';

interface EmployeeModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNum: number;
    
}

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                {/* Route for the new employee form */}
                <Route path="/new-employee" Component={NewEmployeeForm} />
            </Switch>
        </Router>
    );
};

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const handleNewEmployeeClick = () => {
        history.push("/new-employee");
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("https://localhost:7222/api/Employee/GetAllEmployees");
                const data: EmployeeModel[] = await response.json();
                setEmployees(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return <div>Loading employees...</div>;
    }

    return (
        <div className="employee-list-container">
            <div className="header">
                <h1>Employees</h1>
                {employees.length === 0 ? <p>No employees</p> : <p>There are {employees.length} employees</p>}
                <div className="actions">
                    <input type="text" placeholder="Search" className="search-input" />
                    <button className="filter-button">Filter by</button>
                    <button className="new-employee-button" onClick={handleNewEmployeeClick}>+ New Employee</button>
                </div>
            </div>

            {/* Conditionally render the empty state if no employees are present */}
            {employees.length === 0 ? (
                <div className="empty-state">
                    <img src="/assets/empty-state.JPG" alt="Empty state" className="empty-state-image" />
                    <p>There is nothing here</p>
                    <p>Create a new employee by clicking the</p> <strong>New Employee</strong> <p> button to get started</p>
                </div>
            ) : (
                <div className="employee-list">
                        {employees.map((employee, index) => (
                            <div key={employee.id} className="employee-card">
                            <span className="employee-id">{index + 1}</span>
                            <span className="employee-FirstName">{employee.firstName}</span>
                            <span className="employee-LastName">{employee.lastName}</span>
                            <span className="employee-PhoneNum">{employee.phoneNum}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default App; EmployeeList;