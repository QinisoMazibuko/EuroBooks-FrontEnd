import React, {  useState } from 'react';


export const AuthContext = React.createContext();

const initialstate = {
    IsAuthenticated :false,
    User:{
        FirstName:"",
        LastName:"",
        Email:"",
        AuthToken: "",
        Role:""
    }
    
};

export const AuthProvider = (props)=> {
    const [Auth, setAuth] = useState(initialstate)
    return(
        <AuthContext.Provider value = {[Auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

