import { Outlet, useLocation } from 'react-router-dom';
import './App.css'
import EmployeeTable from './components/employees/EmployeeTable'
import { Container } from 'semantic-ui-react';
import { useEffect } from 'react';
import { setUpErrorHandlingInterceptor } from './interceptors/axiosInterceptor';

function App() {

    const location = useLocation();

    useEffect(() => {
        setUpErrorHandlingInterceptor();
    }, []);

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