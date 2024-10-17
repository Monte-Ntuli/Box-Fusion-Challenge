import axios from "axios";
import { EmployeeDTO } from "../models/employeeDTO";
import { CreateEmployeeDTO } from "../models/createEmployeeDTO";
import { UpdateEmployeeDTO } from "../models/updateEmployeeDTO";

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
                DOB: employee.DOB,
                isDeleted: employee.isDeleted,
                addresss: {
                    userID: employee.addresss.userID,
                    streetAddress: employee.addresss.streetAddress,
                    city: employee.addresss.city,
                    postalCode: employee.addresss.postalCode,
                    country: employee.addresss.country,
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
        }
    },

    updateEmployee: async (employee: EmployeeDTO, userID: string): Promise<void> => {
        try {
            const updateEmployeeDTO: UpdateEmployeeDTO = {
                userID: userID,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNum: employee.phoneNum,
                DOB: employee.DOB,
                isDeleted: employee.isDeleted,
                addresss: {
                    userID: employee.addresss.userID,
                    streetAddress: employee.addresss.streetAddress,
                    city: employee.addresss.city,
                    postalCode: employee.addresss.postalCode,
                    country: employee.addresss.country,
                },
                skills: employee.skills.map(skill => ({
                    userID: skill.userID,
                    skillID: skill.skillID,
                    name: skill.name,
                    yearsExperience: skill.yearsExperience,
                    seniority: skill.seniority
                })) 
            };
            await axios.post<number>(baseURL + 'Employee/UpdateEmployeeInformation', updateEmployeeDTO);
        } catch (error) {
            console.log(error);
        }
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