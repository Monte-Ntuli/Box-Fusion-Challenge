import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './EmployeeListPage.css';

interface EmployeeModel {
    id: number;
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNum: number;
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<EmployeeModel[]>([]); 
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>(''); 

    const navigate = useNavigate();

    const navigateToAddEmployee = () => {
        navigate('/add-employee');
    };

    const navigateToEditEmployee = (userID: string) => {
        navigate(`/edit-employee/${userID}`);
    };

    // Function to delete an employee by userID
    const handleDeleteEmployee = async (userID: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://localhost:7222/api/Employee/DeleteEmployee/${userID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setEmployees(employees.filter(employee => employee.userID !== userID));
                setFilteredEmployees(filteredEmployees.filter(employee => employee.userID !== userID));
                alert("Employee deleted successfully.");
            } else {
                alert("Failed to delete employee.");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("An error occurred while trying to delete the employee.");
        }
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("https://localhost:7222/api/Employee/GetAllEmployees");
                const data: EmployeeModel[] = await response.json();
                setEmployees(data);
                setFilteredEmployees(data); // Initially set filtered list to full list
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Handle search input and filter employees
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = employees.filter(employee =>
            employee.firstName.toLowerCase().includes(query) ||
            employee.lastName.toLowerCase().includes(query) ||
            employee.email.toLowerCase().includes(query)
        );

        setFilteredEmployees(filtered);
    };

    if (loading) {
        return <div>Loading employees...</div>;
    }

    return (
        <div className="employee-list-container">
            <div className="header">
                <h1>Employees</h1>
                {filteredEmployees.length === 0 ? <p>No employees</p> : <p>There are {filteredEmployees.length} employees</p>}
                <div className="actions">
                    <input
                        type="text"
                        placeholder="Search by First Name, Last Name, or Email"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="new-employee-button" onClick={navigateToAddEmployee}>+ New Employee</button>
                </div>
            </div>

            {filteredEmployees.length === 0 ? (
                <div className="empty-state">
                    <img src="/assets/empty-state.JPG" alt="Empty state" className="empty-state-image" />
                    <p>There is nothing here</p>
                    <p>Create a new employee by clicking the</p> <strong>New Employee</strong> <p> button to get started</p>
                </div>
            ) : (
                <div className="employee-list">
                    {filteredEmployees.map((employee, index) => (
                        <div key={employee.id} className="employee-card">
                            <span className="employee-id">{index + 1}</span>
                            <span className="employee-FirstName">{employee.firstName}</span>
                            <span className="employee-LastName">{employee.lastName}</span>
                            <span className="employee-Email">{employee.email}</span>
                            <span className="employee-PhoneNum">{employee.phoneNum}</span>
                            <span className="edit-button" onClick={() => navigateToEditEmployee(employee.userID)}>Edit</span>
                            <span className="delete-button" onClick={() => handleDeleteEmployee(employee.userID)}>Delete</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
