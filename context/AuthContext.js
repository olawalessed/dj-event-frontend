import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'

//Create the authentication context
const AuthContext = createContext()

//Create context provider for all children component
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //We'll have some methods
    
    //Register user
    const register = async (user) => {
        console.log(user)
    }

    //Login User
    const login = async ({ email:identifier, password }) => {
        console.log({identifier, password})
    }
 
    //Logout user
    const logout = async () => {
        console.log('Logout')
    }

    //Check if user is logged in to persist user accross the entire application during refreshes
    const checkUserLogged = async (user) => {
        console.log('Check')
    }


    return (
      <AuthContext.Provider value={{ user, error, register, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
}


export default AuthContext