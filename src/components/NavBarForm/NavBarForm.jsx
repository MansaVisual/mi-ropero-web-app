import React from "react"
import info from "../../assets/img/info.png"
import info2 from "../../assets/img/info2.png"
import down from "../../assets/img/down.png"
import down2 from "../../assets/img/down2.png"
import tarjeta from "../../assets/img/tarjeta.png"
import tarjeta2 from "../../assets/img/tarjeta2.png"
import check from "../../assets/img/check.png"
import check2 from "../../assets/img/check2.png"

const NavBarForm = ({typeNav,onNextForm})=>{

    return(
        <div className="navForm">
            <div style={{textAlign:"center",margin:"0px 3px"}} onClick={()=>onNextForm("info")}>
                <img src={typeNav==="info" ? info : info2} alt="INFO"
                    className={`${typeNav==="info" ? "navEnabled" : "navDisabled"}`}
                />
                <div className={`${typeNav==="info" ? "barraInferior" : "barraInferiorDisabled"}`}></div>
            </div>
            <div style={{textAlign:"center",margin:"0px 6px"}} onClick={()=>onNextForm("envio")}>
            <img src={typeNav==="envio" ? down : down2} alt="DOWN"
                    className={`${typeNav==="envio" ? "navEnabled" : "navDisabled"}`} 
                />
                <div className={`${typeNav==="envio" ? "barraInferior" : "barraInferiorDisabled"}`}></div>
            </div>
            <div style={{textAlign:"center",margin:"0px 6px"}} onClick={()=>onNextForm("tarjeta")}>
            <img src={typeNav==="tarjeta" ? tarjeta : tarjeta2} alt="INFO"
                    className={`${typeNav==="tarjeta" ? "navEnabled" : "navDisabled"}`} 
                />
                <div className={`${typeNav==="tarjeta" ? "barraInferior" : "barraInferiorDisabled"}`}></div>
            </div>
            <div style={{textAlign:"center",margin:"0px 6px"}} onClick={()=>onNextForm("check")}>
            <img src={typeNav==="check" ? check : check2} alt="INFO"
                    className={`${typeNav==="check" ? "navEnabled" : "navDisabled"}`} 
                />
                <div className={`${typeNav==="check" ? "barraInferior" : "barraInferiorDisabled"}`}></div>
            </div>
        </div>
    )
}

export default NavBarForm