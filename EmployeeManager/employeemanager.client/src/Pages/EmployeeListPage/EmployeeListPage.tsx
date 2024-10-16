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
    dateOfBirth: string;  // Assuming dateOfBirth is in 'YYYY-MM-DD' format
    skills: { skill: string }[];  // Assuming skills is an array of skill objects with 'skill' property
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<EmployeeModel[]>([]); // For filtered results
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>(''); // For search input
    const [filterYear, setFilterYear] = useState<string>('');   // For filtering by year (date of birth)
    const [filterSkill, setFilterSkill] = useState<string>(''); // For filtering by skill

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
        applyFilters(query, filterYear, filterSkill); // Apply filters when search changes
    };

    // Handle year filter
    const handleYearFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = event.target.value;
        setFilterYear(selectedYear);
        applyFilters(searchQuery, selectedYear, filterSkill); // Apply filters when year changes
    };

    // Handle skill filter
    const handleSkillFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSkill = event.target.value;
        setFilterSkill(selectedSkill);
        applyFilters(searchQuery, filterYear, selectedSkill); // Apply filters when skill changes
    };

    // Function to apply all filters (search, year, and skill)
    const applyFilters = (search: string, year: string, skill: string) => {
        const filtered = employees.filter(employee => {
            const matchesSearch = employee.firstName.toLowerCase().includes(search) ||
                employee.lastName.toLowerCase().includes(search) ||
                employee.email.toLowerCase().includes(search);

            const matchesYear = year ? new Date(employee.dateOfBirth).getFullYear().toString() === year : true;

            const matchesSkill = skill ? employee.skills.some(empSkill => empSkill.skill.toLowerCase() === skill.toLowerCase()) : true;

            return matchesSearch && matchesYear && matchesSkill;
        });

        setFilteredEmployees(filtered);
    };

    if (loading) {
        return <div>Loading employees...</div>;
    }

    // Get unique years from employee data for the year filter dropdown
    const uniqueYears = Array.from(new Set(employees.map(emp => new Date(emp.dateOfBirth).getFullYear().toString())));

    // Get unique skills from employee data for the skill filter dropdown
    const uniqueSkills = Array.from(new Set(employees.flatMap(emp => emp.skills.map(skill => skill.skill))));

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

                    {/* Year Filter */}
                    <select value={filterYear} onChange={handleYearFilter} className="filter-dropdown">
                        <option value="">Filter by Year (Date of Birth)</option>
                        {uniqueYears.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    {/* Skill Filter */}
                    <select value={filterSkill} onChange={handleSkillFilter} className="filter-dropdown">
                        <option value="">Filter by Skill</option>
                        {uniqueSkills.map((skill) => (
                            <option key={skill} value={skill}>{skill}</option>
                        ))}
                    </select>

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
