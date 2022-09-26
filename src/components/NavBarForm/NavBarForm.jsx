import React from "react"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const NavBarForm = ({typeNav,onNextForm})=>{

    return(
        <div className="navForm">
            <div style={{textAlign:"center",margin:"0px 3px"}} onClick={()=>onNextForm("info")}>
                <InfoOutlinedIcon
                    className={`${typeNav==="info" ? "navEnabled" : "navDisabled"}`}
                />
                <div className={`${typeNav==="info" ? "barraInferior" : "barraInferiorDisabled"}`}></div>
            </div>
            <div style={{textAlign:"center",margin:"0px 6px"}} onClick={()=>onNextForm("envio")}>
                <SystemUpdateAltOutlinedIcon 
                    className={`${typeNav==="envio" ? "navEnabled" : "navDisabled"}`} 
                />
                <div className={`${typeNav==="envio" ? "barraInferior" : "barraInferiorDisabled"}`}></div>
            </div>
            <div style={{textAlign:"center",margin:"0px 6px"}} onClick={()=>onNextForm("tarjeta")}>
                <CreditCardOutlinedIcon 
                    className={`${typeNav==="tarjeta" ? "navEnabled" : "navDisabled"}`} 
                />
                <div className={`${typeNav==="tarjeta" ? "barraInferior" : "barraInferiorDisabled"}`}></div>
            </div>
            <div style={{textAlign:"center",margin:"0px 6px"}} onClick={()=>onNextForm("check")}>
                <CheckCircleOutlineOutlinedIcon 
                    className={`${typeNav==="check" ? "navEnabled" : "navDisabled"}`} 
                />
                <div className={`${typeNav==="check" ? "barraInferior" : "barraInferiorDisabled"}`}></div>
            </div>
        </div>
    )
}

export default NavBarForm