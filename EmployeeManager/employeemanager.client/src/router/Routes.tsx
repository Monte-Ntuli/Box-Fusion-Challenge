import { createBrowserRouter, RouteObject } from "react-router-dom";
import EmployeeForm from "../components/employees/EmployeeForm.tsx";
import EmployeeTable from "../components/employees/EmployeeTable.tsx";
import App from "../App.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'createEmployee', element: <EmployeeForm key='create' /> },
            { path: 'editEmployee/:userID', element: <EmployeeForm key='edit' /> },
            { path: '*', element: <EmployeeTable/> }
        ]
    }
]

export const router = createBrowserRouter(routes)