import UserContext from '@components/user-context'
import HomeLayout from '@layouts/home-layout'
import Router from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

export default function Login() {

  const {user, signIn} = useContext(UserContext)
  const [visible, setVisible] = useState(false)
  const [mount, setMount] = useState(false)

  useEffect(() => {
    if(user.id != null) {
      Router.push('/')
    } else {
      setTimeout(() => {
        setMount(true)
      }, 500)
    }
  }, [user.id])

  const logIn = (e) => {
    e.preventDefault()
    const username = document.querySelector('#user-name').value
    const token = 'TOKENMAGICO'

    signIn(username, token)
  }

  const showPassword = () => {
    const passVisible = document.querySelector('#flexSwitchCheckDefault').checked
    setVisible(passVisible)
  }

  if (!mount) {
    return <span>Loading...</span>
  }
  
  return (
    <HomeLayout>
      <h1 className="mb-5">Iniciar sesión</h1>
      <form onSubmit={logIn} className="mx-auto text-center" style={{maxWidth: '360px'}}>
        <div className="form-group mb-3">
          <input type="text" className="form-control text-center" placeholder="Usuario" id="user-name"/>
        </div>
        <div className="form-group mb-3">
          <input type={visible ? "text" : "password"} className="form-control text-center" placeholder="Contraseña" id="user-password"/>
        </div>
        <div className="form-check form-switch text-start d-flex justify-content-center mb-5">
          <input className="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" onChange={showPassword}/>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Mostrar contraseña</label>
        </div>
        <div className="d-flex flex-column align-items-center">
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        <button type="submit" className="btn btn-link">Crear cuenta</button>
        </div>
      </form>
    </HomeLayout>
  )
  
}
