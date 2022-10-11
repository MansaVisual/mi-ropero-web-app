import { Grid } from '@mui/material'
import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import ValidationPopUp from '../../components/BoxLogin/ValidationPopUp'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import BoxLoginValidate from './BoxLoginValidate'

const LoginValidation = () => {

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [sendCod,setSendCod]=useState(true)

  return (
    <>
      <Grid>
          <div className="loginValidationContainer">
              <Breadcrumbs links={pathnames}/>
              <BoxLoginValidate />
          </div>

      </Grid>
      {sendCod && 
        <ValidationPopUp setSendCod={setSendCod}/>
      }
    </>
  )
}

export default LoginValidation