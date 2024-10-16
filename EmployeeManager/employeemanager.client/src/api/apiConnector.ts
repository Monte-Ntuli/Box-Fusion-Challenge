import axios from "axios";
import { EmployeeDTO } from "../models/employeeDTO";
import { CreateEmployeeDTO } from "../models/createEmployee";
import { UpdateEmployeeDTO } from "../models/updateEmployeeDTO";
import { GetEmployeeByIDResponse } from "../models/getEmployeeByIdResponse";

const baseURL = 'https://localhost:7222/api/';

const apiConnector = {

    getALLEmployees: async () => {
            const response = await fetch(baseURL + 'Employee/GetAllEmployees');
            const data: EmployeeDTO[] = await response.json();
            return data;
    },

    createEmployee: async (employee: CreateEmployeeDTO): Promise<void> => {
        await fetch(baseURL + 'Employee/AddEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        });
    },

    updateEmployee: async (employee: UpdateEmployeeDTO): Promise<void> => {
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
        const data: GetEmployeeByIDResponse[] = await response.json();
        return data;
    },
}

export default apiConnector;