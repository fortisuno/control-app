import Content from '@components/content';
import Nav from '@components/nav';
import UserContext from '@components/user-context';
import DashboardLayout from '@layouts/dashboard-layout'
import React, {useContext, useEffect, useState} from 'react'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { view: 'matrona' } },
      { params: { view: 'embarazada' } },
      { params: { view: 'centro' } },
      { params: { view: 'clase' } },
      { params: { view: 'asistencia' } }
    ],
    fallback: false
  };
}

export async function getStaticProps({params}) {
  return {
    props: {
      view: params.view,
      menu: [
        {name: 'Consulta', href: 'tab-consulta'},
        {name: 'Alta', href: 'tab-alta'},
        {name: 'Baja', href: 'tab-baja'},
        {name: 'Modificar', href: 'tab-modificar'}
      ]
    }
  }
}


export default function View({view, menu}) {
  const title = view.charAt(0).toUpperCase() + view.slice(1);
  const { user } = useContext(UserContext) // puedes acceder al nombre del usuario con user.id y al token con user.token
  const [registros, setRegistros] = useState(null)   

  useEffect(() => {
    // Aqui haz la consulta
    //getRegistros().then(resp => {
    //  if (resp.ok) {
    //    setRegistros(resp.data) // el resp.data es el array de la respuesta
    //  } else {
          setTimeout(() => {
            setRegistros([])
          }, 1000)
    //  }
    //}
    //})
  }, [])

  if (user.id == null) {
    return <span>Loading...</span>
  }

  return (
    <DashboardLayout current={view}>
      <div className="position-absolute d-flex flex-column" style={{top: 0, right: 0}}>
        <span>Usuario: {user.id}</span>
        <span>Token: {user.token}</span>
      </div>
      <h1 className="mb-4">{title}</h1>
      <Nav menu={menu}>
        <Content id="tab-consulta" defaultView>
          <ul className="list-group">
            <li className="list-group-item active">
              <div className="row text-center">
                <span className="col">Campo1</span>
                <span className="col">Campo2</span>
                <span className="col">Campo3</span>
                <span className="col">Campo4</span>
              </div>
            </li>
            {
              registros != null
                ? registros.length > 0
                    ? (
                        <li className="list-group-item">
                          <div className="row text-center">
                            <span className="col">Campo1</span>
                            <span className="col">Campo2</span>
                            <span className="col">Campo3</span>
                            <span className="col">Campo4</span>
                          </div>
                        </li>
                      )
                    : (
                        <li className="list-group-item text-center py-5">
                          No hay resultados
                        </li>
                      )
                : (
                    <li className="list-group-item text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </li>
                  )
            }
          </ul>
        </Content>
        <Content id="tab-alta">
          <p>Contenido de altas</p>
        </Content>
        <Content id="tab-baja">
          <p>Contenido de bajas</p>
        </Content>
        <Content id="tab-modificar">
          <p>Contenido de modificaciones</p>
        </Content>
      </Nav>
    </DashboardLayout>
  )
}
