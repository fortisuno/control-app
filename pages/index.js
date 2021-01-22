import HomeLayout from '@layouts/home-layout'
import React from 'react'

export async function getServerSideProps() {
  // Aqui valida si el usuario esta loggeado o no
  return {
    props: {
      // los datos que quieres que retorne si está loggeado
    },
    // si está loggeado descomenta las siguientes lineas para que redirija a la app
    // redirect: {
    //   destination: '/home',
    //   permanent: false
    // }
  }
}

export default function Home() {
  return (
    <HomeLayout>
      <h1 className="mb-5">Iniciar sesión</h1>
      <form className="mx-auto text-center" style={{maxWidth: '360px'}}>
        <div className="form-group mb-3">
          <input type="text" className="form-control text-center" placeholder="Usuario" id="usuario"/>
        </div>
        <div className="form-group mb-3">
          <input type="password" className="form-control text-center" placeholder="Contraseña" id="usuario"/>
        </div>
        <div className="form-check form-switch text-start d-flex justify-content-center mb-5">
          <input className="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" />
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
