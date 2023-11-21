/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AuthLayout = ({children, authentication = true}) => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate() 
    const authStatus = useSelector(state=> state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoading(false)
    },[authStatus, authentication, navigate])

  return  loading ? (
    <p>Loading...</p>
  ) : (
    <div>{children}</div>
  )
}

export default AuthLayout