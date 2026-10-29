/* Shariff Muhammad 236111732 */

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }){

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('piqharbourUser');
        return saved ? JSON.parse(saved) : null;
    });

    function login(userData){

        setUser(userData);
        localStorage.setItem('piqharbourUser', JSON.stringify(userData));

    }

    function logout(){

        setUser(null);
        localStorage.removeItem('piqharbourUser');

    }

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser: login }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth(){

    return useContext(AuthContext);

}