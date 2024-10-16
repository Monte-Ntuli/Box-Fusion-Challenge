import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateEmployeeInformation, getEmployeeById } from '../api';
import './EditEmployeePage.css';

interface Skill {
    skill: string;
    yearsExperience: number;
    seniorityRating: string;
}

interface Employee {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    dateOfBirth: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    skills: Skill[];
}

const EmployeeForm: React.FC = () => {
    const { userID } = useParams<{ userID: string }>();
    const [skills, setSkills] = useState<Skill[]>([{ skill: '', yearsExperience: 0, seniorityRating: '' }]);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const initialFormState = {
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        dateOfBirth: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        country: '',
    };

    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                if (userID) {
                    const employeeData: Employee = await getEmployeeById(userID); 
                    setFormState({
                        firstName: employeeData.firstName,
                        lastName: employeeData.lastName,
                        contactNumber: employeeData.contactNumber,
                        email: employeeData.email,
                        dateOfBirth: employeeData.dateOfBirth,
                        streetAddress: employeeData.streetAddress,
                        city: employeeData.city,
                        postalCode: employeeData.postalCode,
                        country: employeeData.country,
                    });
                    setSkills(employeeData.skills);
                }
            } catch (error) {
                setError('Failed to load employee data.');
            }
        };

        fetchEmployeeData();
    }, [userID]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const addSkill = () => {
        setSkills([...skills, { skill: '', yearsExperience: 0, seniorityRating: '' }]);
    };

    const handleSkillChange = (index: number, field: string, value: string | number) => {
        const newSkills = [...skills];
        newSkills[index] = { ...newSkills[index], [field]: value };
        setSkills(newSkills);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        for (let [key, value] of formData.entries()) {
            if (value === '') {
                setError(`${key} is required.`);
                return;
            }
        }

        const employee = {
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            phoneNum: formState.contactNumber,
            dob: new Date(formState.dateOfBirth),
            isDeleted: false,
            address: {
                streetAddress: formState.streetAddress,
                city: formState.city,
                postalCode: formState.postalCode,
                country: formState.country
            },
            skills: skills.map(skill => ({
                name: skill.skill,
                yearsExperience: skill.yearsExperience,
                seniority: skill.seniorityRating
            }))
        };

        try {
            await updateEmployeeInformation(employee);
            setError(null);
            setFormState(initialFormState);
            setSkills([{ skill: '', yearsExperience: 0, seniorityRating: '' }]);
            setNotification('Form submitted successfully!');
            setTimeout(() => setNotification(null), 3000); // Remove notification after 3 seconds
        } catch (error) {
            setError('Failed to submit form.');
        }
    };

    const handleCancel = () => {
        setFormState(initialFormState);
        setSkills([{ skill: '', yearsExperience: 0, seniorityRating: '' }]);
        setError(null);
    };

    return (
        <div className="employee-form">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formState.contactNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formState.dateOfBirth}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Street Address</label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={formState.streetAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formState.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formState.postalCode}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formState.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <h3>Skills</h3>
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-section">
                            <input
                                type="text"
                                placeholder="Skill"
                                name={`Skill ${index + 1}`}
                                value={skill.skill}
                                onChange={(e) => handleSkillChange(index, 'skill', e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Yrs Exp"
                                name={`Years of Experience ${index + 1}`}
                                value={skill.yearsExperience}
                                onChange={(e) => handleSkillChange(index, 'yearsExperience', parseInt(e.target.value))}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Seniority Rating"
                                name={`Seniority Rating ${index + 1}`}
                                value={skill.seniorityRating}
                                onChange={(e) => handleSkillChange(index, 'seniorityRating', e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addSkill}>+ Add New Skill</button>
                </div>
                <button type="submit" className="save-button">Update Employee</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                {error && <p className="error">{error}</p>}
                {notification && <p className="notification">{notification}</p>}
            </form>
        </div>
    );
};

export default EmployeeForm;
