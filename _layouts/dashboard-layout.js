import React, { useContext } from 'react'
import Link from 'next/link'
import UserContext from '@components/user-context'

export default function DashboardLayout({current, children}) {
  const {signOut} = useContext(UserContext)

  const logout = () => {
    signOut()
  }

  return (
    <div className="container">
      <div className="row vh-100">
        <div className="col-md-3 py-5">
          <h3 className="mb-5">Panel de control</h3>
          <ul className="nav nav-pills flex-column mb-5">
            <li className="nav-item">
              <Link href="/matrona">
                <a className={"nav-link" + (current === 'matrona' ? ' active' : '')}>Matrona</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/embarazada">
                <a className={"nav-link" + (current === 'embarazada' ? ' active' : '')}>Embarazada</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/centro">
                <a className={"nav-link" + (current === 'centro' ? ' active' : '')}>Centro</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/clase">
                <a className={"nav-link" + (current === 'clase' ? ' active' : '')}>Clase</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/asistencia">
                <a className={"nav-link" + (current === 'asistencia' ? ' active' : '')}>Asistencia</a>
              </Link>
            </li>
          </ul>
          <button type="button" className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
        </div>
        <div className="col p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
