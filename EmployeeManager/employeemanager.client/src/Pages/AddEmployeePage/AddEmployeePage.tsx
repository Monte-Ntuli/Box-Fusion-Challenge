import React, { useState } from 'react';
import './AddEmployeePage.css';

const NewEmployeeForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [skills, setSkills] = useState([{ skill: '', yearsExp: '', seniorityRating: '' }]);

    const addSkill = () => {
        setSkills([...skills, { skill: '', yearsExp: '', seniorityRating: '' }]);
    };

    const handleSubmit = () => {
        // Implement submission logic
        console.log("New Employee Added");
    };

    return (
        <div className="new-employee-form-container">
            <h2>New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Basic Info</h3>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>

                <div className="form-section">
                    <h3>Address Info</h3>
                    <input type="text" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>

                <div className="form-section">
                    <h3>Skills</h3>
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-section">
                            <input type="text" placeholder="Skill" value={skill.skill} onChange={(e) => {
                                const newSkills = [...skills];
                                newSkills[index].skill = e.target.value;
                                setSkills(newSkills);
                            }} />
                            <input type="text" placeholder="Yrs Exp" value={skill.yearsExp} onChange={(e) => {
                                const newSkills = [...skills];
                                newSkills[index].yearsExp = e.target.value;
                                setSkills(newSkills);
                            }} />
                            <input type="text" placeholder="Seniority Rating" value={skill.seniorityRating} onChange={(e) => {
                                const newSkills = [...skills];
                                newSkills[index].seniorityRating = e.target.value;
                                setSkills(newSkills);
                            }} />
                        </div>
                    ))}
                    <button type="button" onClick={addSkill}>+ Add New Skill</button>
                </div>

                <button type="submit" className="save-button">Save and Add Employee</button>
            </form>
        </div>
    );
};

export default NewEmployeeForm;
