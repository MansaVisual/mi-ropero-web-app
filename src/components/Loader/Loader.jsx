import React from "react"

const Loader = ({spin,white})=>{
    return(
        <div className={`${spin} ${white}`}></div>
    )
}
export default Loader