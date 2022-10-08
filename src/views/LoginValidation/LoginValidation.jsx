import { Grid } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import BoxLoginValidate from './BoxLoginValidate'

const LoginValidation = () => {

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
    <Grid>
        <div className="loginValidationContainer">
            <Breadcrumbs links={pathnames}/>
            <BoxLoginValidate />
        </div>
    </Grid>
</>
  )
}

export default LoginValidation