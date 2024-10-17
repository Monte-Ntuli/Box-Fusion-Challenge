import axios from "axios";
import { EmployeeDTO } from "../models/employeeDTO";
import { CreateEmployeeDTO } from "../models/createEmployeeDTO";

const baseURL = 'https://localhost:7222/api/';

const apiConnector = {

    getALLEmployees: async () => {
            const response = await fetch(baseURL + 'Employee/GetAllEmployees');
            const data: EmployeeDTO[] = await response.json();
            return data;
    },

    createEmployee: async (employee: EmployeeDTO): Promise<void> => {
        try {
            const createEmployeeDTO: CreateEmployeeDTO = {
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNum: employee.phoneNum,
                DOB: new Date(employee.DOB),
                isDeleted: employee.isDeleted,
                addresss: {
                    userID: employee.address.userID,
                    streetAddress: employee.address.streetAddress,
                    city: employee.address.city,
                    postalCode: employee.address.postalCode,
                    country: employee.address.country,
                },
                skills: employee.skills.map(skill => ({
                    userID: skill.userID,
                    skillID: skill.skillID,
                    name: skill.name,
                    yearsExperience: skill.yearsExperience,
                    seniority: skill.seniority
                }))
            };

            await axios.post<number>(baseURL + 'Employee/AddEmployee', createEmployeeDTO);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    updateEmployee: async (employee: EmployeeDTO): Promise<void> => {
        await fetch(baseURL + 'Employee/AddEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        });
    }, 

    deleteEmployee: async (userID: string): Promise<void> => {
            await axios.delete<number>(baseURL + 'Employee/DeleteEmployeeInformation/' + userID);
    },

    deleteEmployeeSkill: async (skillID: string): Promise<void> => {
            await axios.delete<number>(baseURL + 'Skills/DeleteSkillBySkillId/' + skillID);
    },

    getEmployeeById: async (userID: string) => {
        const response = await fetch(baseURL + 'Employee/GetEmployeeInformationByuserID/' + userID);
        const data: EmployeeDTO = await response.json();
        return data;
    },
}

export default apiConnector;