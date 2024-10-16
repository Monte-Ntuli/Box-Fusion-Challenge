import axios, { AxiosResponse } from 'axios';

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

const baseURL = 'https://localhost:7222/api/';

const deleteUserURL = 'https://localhost:7222/api/Employee/DeleteEmployeeInformation';

const deleteSkillURL = 'https://localhost:7222/api/Skills/DeleteSkillBySkillId';

const getEmployeeDataURL = "https://localhost:7222/api/Employee/GetEmployeeInformationByuserID";

export const createEmployee = (employee: any) => {
    return axios.post(baseURL + "Employee/AddEmployee", employee);
};

export const updateEmployeeInformation = (updatedEmployee: any) => {
    return axios.put(baseURL + "Employee/UpdateEmployeeInformation", updatedEmployee);
};

export const deleteEmployeeInformation = (employeeId: string) => {
    return axios.delete(`${deleteUserURL}/${employeeId}`);
};

export const getEmployeeById = async (userID: string): Promise<Employee> => {
    const response: AxiosResponse<Employee> = await axios.get(`${getEmployeeDataURL}/${userID}`);
    return response.data; 
};

export const deleteSkillsBySkillID = (employeeId: string) => {
    return axios.delete(`${deleteSkillURL}/${employeeId}`);
};
