import { createContext } from "react";

export const UseProdsContext = createContext();

export const ProdsContext = ({children}) => {

    return(
        <UseProdsContext.Provider value={{}}>
            {children}
        </UseProdsContext.Provider>
    )
}
