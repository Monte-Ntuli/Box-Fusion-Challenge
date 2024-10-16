import { useEffect, useState } from "react";
import { EmployeeDTO } from "../../models/employeeDTO";
import apiConnector from "../../api/apiConnector";
import { Button, Container } from "semantic-ui-react";
import EmployeeTableItem from "./EmployeeTableItem";
import { NavLink, useNavigate } from 'react-router-dom';
import './EmployeeTable.css';

export default function Table() {

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
        return <Container className="container-style">
            <div className="empty-state">
                <img src="/assets/empty-state.JPG" alt="Empty state" className="empty-state-image" />
                <p>There is nothing here</p>
                <p>Create a new employee by clicking the</p> <strong>New Employee</strong> <p> button to get started</p>
            </div>
        </Container>;
    }

    return (
        <>
            <div className="container-style">
                <div className="header">
                    <h1>Employees</h1>
                    {employees.length === 0 ? <p>No employees</p> : <p>There are {employees.length} employees</p>}
                    <div className="actions">
                        <input type="text" placeholder="Search" className="search-input" />
                        <Button className="filter-button">Filter by</Button>
                        <Button as={NavLink} to="createEmployee" type="button" content="+ New Employee" positive />
                    </div>
                </div>
            </div>
            {employees === undefined || employees.length === 0 ? (
                <Container className="container-style">
                    <div className="empty-state">
                        <img src="/assets/empty-state.JPG" alt="Empty state" className="empty-state-image" />
                        <p>There is nothing here</p>
                        <p>Create a new employee by clicking the</p> <strong>New Employee</strong> <p> button to get started</p>
                    </div>
                </Container>
            ) : (
                    <Container className="container-style">
                    <table className="ui inverted table">
                        <thead style={{ textAlign: 'center' }}>
                        </thead>
                        <tbody>
                            {employees.length !== 0 && (
                                employees.map((employee, index) => (
                                    <EmployeeTableItem key={index} employee={employee} />
                                ))
                            )}
                        </tbody>
                    </table>
                </Container>
            )}
        </>
    );
}
