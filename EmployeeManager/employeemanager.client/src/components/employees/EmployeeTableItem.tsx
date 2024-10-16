import { Button } from "semantic-ui-react";
import { EmployeeDTO } from "../../models/employeeDTO";
import apiConnector from "../../api/apiConnector";
import { NavLink } from "react-router-dom";

interface Props {
    employee: EmployeeDTO
}

export default function MovieTableItem({ employee }: Props) {
    return (
        <>
            <tr className="center aligned">
                <td data-label="FirstName">{employee.firstName}</td>
                <td data-label="LastName">{employee.lastName}</td>
                <td data-label="ContactNumber">{employee.phoneNum}</td>
                <td data-label="Action">
                    <Button as={NavLink} to={'editEmployee/' + employee.userID} color="yellow" type="submit">
                        Edit
                    </Button>

                    <Button type="button" negative onClick={async () => {
                        await apiConnector.deleteEmployee(employee.userID!);
                        window.location.reload();
                    }}>
                    Delete
                    </Button>
                </td>
                
            </tr>
        </>
    )
}