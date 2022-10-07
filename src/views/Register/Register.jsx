import { Grid } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import BoxRegister from '../../components/BoxRegister/BoxRegister';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const Register = () => {

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)

    return (
        <>
            <Grid>
                <div className="registerContainer">
                    <Breadcrumbs links={pathnames}/>
                    <BoxRegister />
                </div>
            </Grid>
        </>
    )
}

export default Register