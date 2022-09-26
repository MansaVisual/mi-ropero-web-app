import { createContext } from "react";

export const UseProdsContext = createContext();

const ProdsContext = ({children}) => {

    return(
        <UseProdsContext.Provider value={{}}>
            {children}
        </UseProdsContext.Provider>
    )
}

export default ProdsContext