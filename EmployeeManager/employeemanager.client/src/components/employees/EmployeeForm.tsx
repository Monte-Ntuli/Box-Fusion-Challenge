import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import apiConnector from "../../api/apiConnector";
import { Button  } from "semantic-ui-react";
import { EmployeeDTO } from "../../models/employeeDTO";
import './EmployeeForm.css';

export default function EmployeeForm() {

    const navigate = useNavigate();
    const {userID} = useParams();

    const[employee, setEmployee] = useState<EmployeeDTO>({

        userID: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNum: '',
        DOB: '',
        isDeleted: false,
        address: {
            userID: '',
            streetAddress: '',
            city: '',
            postalCode: '',
            country: '',
        },
        skills: [
            {
                userID: '',
                skillID: '',
                name: '',
                yearsExperience: 0,
                seniority: '',
            }
        ]
    });

    useEffect(() => {
        if (userID) {
            apiConnector.getEmployeeById(userID).then();
        }
    }, [userID]);

    function handleSubmit() {
        if (!employee.userID) {
            apiConnector.createEmployee(employee).then(() => navigate('/'));
        } else {
            apiConnector.updateEmployee(employee).then(() => navigate('/'));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        
        if (name in employee.address) {
            setEmployee(prevEmployee => ({
                ...prevEmployee,
                address: {
                    ...prevEmployee.address,
                    [name]: value
                }
            }));
        }
        
        else if (name.startsWith('Skill') || name.startsWith('Years of Experience') || name.startsWith('Seniority Rating')) {

            const index = parseInt(name.split(' ')[1]) - 1; 
            const fieldName = name.startsWith('Name') ? 'name' :
                name.startsWith('Years of Experience') ? 'yearsExperience' :
                    'seniority'; 

            handleSkillChange(index, fieldName, value);
        }
        
        else {
            setEmployee(prevEmployee => ({
                ...prevEmployee,
                [name]: value
            }));
        }
    }



    const addSkill = () => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            skills: [
                ...prevEmployee.skills,
                {
                    userID: '',  
                    skillID: '', 
                    name: '',
                    yearsExperience: 0,
                    seniority: ''
                }
            ]
        }))
    };

    const deleteSkill = (index: number) => {
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            skills: prevEmployee.skills.filter((_, i) => i !== index)
        }));
    };

    const handleSkillChange = (index: number, field: string, value: string | number) => {
        setEmployee(prevEmployee => {
            const updatedSkills = [...prevEmployee.skills]; 
            updatedSkills[index] = {
                ...updatedSkills[index], 
                [field]: value 
            };

            return {
                ...prevEmployee,
                skills: updatedSkills 
            };
        });
    };



    const handleCancel = () => {
        setEmployee(employee);
    };

    return (
        <div className="employee-form">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-section">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="phoneNum"
                        value={employee.phoneNum}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="DOB"
                        value={employee.DOB}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Street Address</label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={employee.address.streetAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={employee.address.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={employee.address.postalCode}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={employee.address.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section">
                    <h3>Skills</h3>
                    {employee.skills.map((skill, index) => (
                        <div key={index} className="skill-section">
                            <input
                                type="text"
                                placeholder="Skill"
                                name={`Name ${index + 1}`}
                                value={skill.name}
                                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
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
                                value={skill.seniority}
                                onChange={(e) => handleSkillChange(index, 'seniority', e.target.value)}
                                required
                            />
                            {skill.skillID !== '' ? (
                                <Button type="button" negative className="delete-skill-button" onClick={async () => {
                                    await apiConnector.deleteEmployeeSkill(skill.skillID!);
                                    deleteSkill(index);
                                    window.location.reload();
                                }}>
                                    Delete
                                </Button>
                            ) : (
                                <Button type="button" negative className="delete-skill-button" onClick={async () => {
                                    deleteSkill(index);
                                }}>
                                    Delete
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button type="button" onClick={addSkill}>+ Add New Skill</Button>
                    <Button floated='right' positive type='submit' content='Save and Add Employee' />
                    <Button as={NavLink} to='/' floated='right' content='Cancel' onClick={handleCancel} />
                </div>
                
            </form>
        </div>
    );
}