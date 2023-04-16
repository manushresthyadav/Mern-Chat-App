import { createContext } from "react";
import App from '../App'
export const MyContext = createContext();
export const  ContextProvider= ({children,value})=>{
console.log(children)
    console.log('called from the chats component')
console.log(value);


    return(
        // <div >
    <MyContext.Provider value={value}>
        {children}
    </MyContext.Provider>
    // </div>
    )
    
    }
