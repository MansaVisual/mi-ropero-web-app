import { createContext } from "react";

export const UseCardContext = createContext();

export const CardContext = ({children}) => {

    return(
        <UseCardContext.Provider value={{}}>
            {children}
        </UseCardContext.Provider>
    )
}
