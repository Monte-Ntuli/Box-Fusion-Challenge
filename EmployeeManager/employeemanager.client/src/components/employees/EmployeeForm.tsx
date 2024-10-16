import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import apiConnector from "../../api/apiConnector";
import { Button, Form, Segment } from "semantic-ui-react";
import { GetEmployeeByIDResponse } from "../../models/getEmployeeByIdResponse";

export default function EmployeeForm() {

    const {userID} = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState<GetEmployeeByIDResponse>({
        id: '',
        userID: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNum: '',
        DOB: '',
        isDeleted: false,
        address: {
            streetAddress: '',
            city: '',
            postalCode: '',
            country: '',
        },
        skills: {
            skillID: '',
            skill: '',
            yearsExperience: undefined,
            seniority: '',
        }
    });

    useEffect(() => {
        if (userID) {
            apiConnector.getEmployeeById(userID).then();
        }
    }, [userID]);

    async function handleSubmit() {
        if (!employee.userID) {
            await fetch('https://your-api-endpoint/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });
        } else {
            apiConnector.updateEmployee(employee).then(() => navigate('/'));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    }
    return (
        <>
            <Segment clearing inverted>
                <Form onSubmit={handleSubmit} autoComplete='off' className='ui inverted form'>
                    <Form.Input placeholder='First Name' name='firstName' value={employee.firstName} onChange={handleInputChange} />
                    <Form.Input placeholder='Last Name' name='lastName' value={employee.lastName} onChange={handleInputChange} />
                    <Form.Input placeholder='Contact Number' name='phoneNum' value={employee.phoneNum} onChange={handleInputChange} />
                    <Form.Input placeholder='Email Address' name='email' value={employee.email} onChange={handleInputChange} />
                    <Form.Input placeholder='Date of Birth' name='DOB' value={employee.DOB} onChange={handleInputChange} />
                    <Form.Input placeholder='Street Address' name='employee.address.streetAddress' value={employee.address.streetAddress} onChange={handleInputChange} />
                    <Form.Input placeholder='City' name='city' value={employee.address.city} onChange={handleInputChange} />
                    <Form.Input placeholder='Postal Code' name='postalCode' value={employee.address.postalCode} onChange={handleInputChange} />
                    <Form.Input placeholder='Country' name='country' value={employee.address.country} onChange={handleInputChange}  />

                    <Button floated='right' positive type='submit' content='Save and Add Employee' />
                    <Button as={NavLink} to='/' floated='right' content='Cancel' />
                </Form>
            </Segment>
        </>
    )
}