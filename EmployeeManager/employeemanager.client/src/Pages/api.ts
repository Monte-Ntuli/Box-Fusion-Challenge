import axios from 'axios';

const baseURL = 'https://localhost:7222/api/';

export const createEmployee = (employee: any) => {
    return axios.post(baseURL, employee);
};

export const updateEmployeeInformation = (employeeId: string, updatedEmployee: any) => {
    return axios.put(`${baseURL}/${employeeId}`, updatedEmployee);
};

export const deleteEmployeeInformation = (employeeId: string, updatedEmployee: any) => {
    return axios.delete(`${baseURL}/${employeeId}`, updatedEmployee);
};

export const getEmployeeInformationByuserID = (employeeId: string, updatedEmployee: any) => {
    return axios.get(`${baseURL}/${employeeId}`, updatedEmployee);
};

export const deleteSkillsBySkillID = (employeeId: string, updatedEmployee: any) => {
    return axios.delete(`${baseURL}/${employeeId}`, updatedEmployee);
};
