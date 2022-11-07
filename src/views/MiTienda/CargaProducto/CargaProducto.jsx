import React,{useEffect,useContext,useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { UseLoginContext } from '../../../context/LoginContext';
import ElegirCategoria from './ElegirCategoria';


const CargaProducto = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { userLog } = useContext(UseLoginContext);
  
    const [num, setNum] = useState(1);
  
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
      if (num === 1) {
        setNum(2);
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, [params]);
  
    useEffect(() => {
      if (num !== 1) {
        if (userLog === "") {
          navigate("/login");
        }
      }
    }, [num]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
    {params.seccion === "CATEGORIA" && <ElegirCategoria />}
    </>
  )
}

export default CargaProducto