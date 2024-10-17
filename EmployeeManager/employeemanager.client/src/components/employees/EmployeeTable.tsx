import { useEffect, useState } from "react";
import { EmployeeDTO } from "../../models/employeeDTO";
import apiConnector from "../../api/apiConnector";
import { Button } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';
import './EmployeeTable.css';
import icon from '../../assets/Untitled.png'

export default function ListEmployee() {

    const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {

        const fetchData = async () => {
            const fetchedEmployees = await apiConnector.getALLEmployees();
            setEmployees(fetchedEmployees);
        }

        fetchData();
    }, []);

    const filteredEmployees = employees.filter((employee) => {
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <div className="employee-list-container">
                <div className="header">
                    <h1>Employees</h1>
                    {filteredEmployees.length === 0 ? <p>No employees</p> : <p>There are {filteredEmployees.length} employees</p>}
                    <div className="actions">
                        <input type="text" placeholder="Search by name or email" className="search-input" value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />

                        <Button className="filter-button">Filter by</Button>
                        <Button as={NavLink} to="createEmployee" className="new-employee-button" content="+ New Employee" positive />
                    </div>
                </div> 
                {filteredEmployees.length === 0 ? (
                    <div className="empty-state">
                        <img src={icon} alt="Empty state" className="empty-state-image" />
                        <p>There is nothing here <br></br> Create a new employee by clicking the <br></br>
                           <strong>New Employee</strong> button to get started</p>
                    </div>
                ) : (
                    <div className="employee-list">
                            {filteredEmployees.map((employee, index) => (
                                <div key={employee.userID} className="employee-card">
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
