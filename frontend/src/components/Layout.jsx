import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'

function Layout() {

    const navigate = useNavigate();

  const handleLogIn = () => {
    const credentials = localStorage.getItem("loginDetails");
    if (!credentials) {
       navigate("/signUp")
    }

  }

  useEffect(() => {
    handleLogIn()
  }, [navigate])

    return (
        <>
            <Header />
            <Outlet />
        </>

    )
}

export default Layout