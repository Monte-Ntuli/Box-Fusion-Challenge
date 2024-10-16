import { Outlet, useLocation } from 'react-router-dom';
import './App.css'
import EmployeeTable from './components/employees/EmployeeTable'
import { Container } from 'semantic-ui-react';

function App() {

    const location = useLocation();
    return (
        <>
            {location.pathname === '/' ? <EmployeeTable /> : (
                <Container className="container-style">
                    <Outlet/>
                </Container>
            )}
        </>
    )
}

export default App