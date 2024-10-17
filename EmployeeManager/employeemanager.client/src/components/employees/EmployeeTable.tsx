import { useEffect, useState } from "react";
import { EmployeeDTO } from "../../models/employeeDTO";
import apiConnector from "../../api/apiConnector";
import { Button } from "semantic-ui-react";
import { NavLink, useNavigate } from 'react-router-dom';
import './EmployeeTable.css';

export default function ListEmployee() {

    const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const navigateToAddEmployee = () => {
        navigate('/add-employee');
    };

    useEffect(() => {

        const fetchData = async () => {
            const fetchedEmployees = await apiConnector.getALLEmployees();
            setEmployees(fetchedEmployees);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="container-style">
            <div className="empty-state">
                <img src="/assets/empty-state.JPG" alt="Empty state" className="empty-state-image" />
                <p>There is nothing here</p>
                <p>Create a new employee by clicking the</p> <strong>New Employee</strong> <p> button to get started</p>
            </div>
        </div>;
    }

    return (
        <>
            <div className="employee-list-container">
                <div className="header">
                    <h1>Employees</h1>
                    {employees.length === 0 ? <p>No employees</p> : <p>There are {employees.length} employees</p>}
                    <div className="actions">
                        <input type="text" placeholder="Search" className="search-input" />
                        <Button className="filter-button">Filter by</Button>
                        <Button as={NavLink} to="createEmployee" className="new-employee-button" content="+ New Employee" positive />
                    </div>
                </div>
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
                                <span> <Button as={NavLink} to={'editEmployee/' + employee.userID} color="yellow" type="submit">
                                    Edit
                                </Button>
                                </span>
                                <span> <Button type="button" negative onClick={async () => {
                                    await apiConnector.deleteEmployee(employee.userID!);
                                    window.location.reload();
                                }}>
                                    Delete
                                </Button>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    )

}
