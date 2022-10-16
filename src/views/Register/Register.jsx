import { Grid } from '@mui/material';
import React,{useContext,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import BoxRegister from '../../components/BoxRegister/BoxRegister';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { UseLoginContext } from '../../context/LoginContext';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const {userLog}=useContext(UseLoginContext)

  useEffect(() => {
    console.log("CD")
    if(userLog!==""){
      navigate('/')
    }
  }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Grid>
        <div className='registerContainer'>
          <div className='registerBreadcrumbs'>
            <Breadcrumbs links={pathnames} />
          </div>
          <BoxRegister />
        </div>
      </Grid>
    </>
  );
};

export default Register;
