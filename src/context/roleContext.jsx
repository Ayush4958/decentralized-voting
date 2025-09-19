import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../api/supabaseClient'

const RoleContext = createContext()

export const RoleProvider = ({ children }) => {

  const [role , setRole] = useState(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const fetchRole = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return ;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)

    if (error) {
      console.error(error.message)
    } else {
       setRole(data.role); 
    }
    setLoading(false)
  }
  fetchRole()
}, [])

    return (
    <RoleContext.Provider value={{ role, loading, setRole}}>
      {children}
    </RoleContext.Provider>
    )
}

export const useRole = () => useContext(RoleContext)
