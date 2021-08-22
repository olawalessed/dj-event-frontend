import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'

//Create the authentication context
const AuthContext = createContext()

//Create context provider for all children component
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter()

  useEffect(() => checkUserLogged(), [])

  //We'll have some methods
    
    //Register user
    const register = async (user) => {
        console.log(user)
    }

    //Login User
    const login = async ({ email:identifier, password }) => {
        //console.log({identifier, password})
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier, password
        })
      })

      const data = await res.json()
      
       //console.log(data)
      
      if (res.ok) {
        setUser(data.user)
        router.push('/account/dashboard')
      } else {
        setError(data.message)
      }
    }
 
    //Logout user
    const logout = async () => {
        console.log('Logout')
    }

    //Check if user is logged in to persist user accross the entire application during refreshes
    const checkUserLogged = async (user) => {
        //console.log('Check')
      const res = await fetch(`${NEXT_URL}/api/user`)
      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    }


    return (
      <AuthContext.Provider value={{ user, error, register, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
}


export default AuthContext