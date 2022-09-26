import { createContext } from "react";

export const UseFormContext = createContext();

const FormContext = ({children}) => {

    return(
        <UseFormContext.Provider value={{}}>
            {children}
        </UseFormContext.Provider>
    )
}

export default FormContext