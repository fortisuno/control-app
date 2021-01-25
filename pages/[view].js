import Content from '@components/content';
import Nav from '@components/nav';
import DashboardLayout from '@layouts/dashboard-layout'
import React, {useContext, useEffect, useState} from 'react'
import UserContext from '@components/user-context';
import { getUsuarios, addUsuario, deleteUsuario, modifyUsuario } from '@api/consultas';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Modal = withReactContent(Swal)
const DateToday = new Date().toISOString();

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

export async function getStaticProps({params, req, res}) {

  let api = {}
  // El params.view ya esta definido arriba esas son las opciones entonces haces un switch para determinar el metodo de acuerdo al param
  switch(params.view) {
    case 'matrona':
      api = {
        method: 'Matrona'
      }
      break;
    case 'embarazada':
      api = {
        method: 'Matrona'
      }
      break;
    case 'centro':
      api = {
        method: 'Matrona'
      }
      break;
    case 'clase':
      api = {
        method: 'Matrona'
      }
      break;
    default:
      break;
  }

  return {
    props: {
      view: params.view,
      menu: [
        {name: 'Consulta', href: 'tab-consulta'},
        {name: 'Alta', href: 'tab-alta'},
        {name: 'Baja', href: 'tab-baja'},
        {name: 'Modificar', href: 'tab-modificar'}
      ],
      api: api
    }
  }
}


export default function View({view, menu, api}) {
  const title = view.charAt(0).toUpperCase() + view.slice(1);
  const { user } = useContext(UserContext) 
  const [registros, setRegistros] = useState(null)   

  useEffect(() => {
    // Aqui haz la consulta
    getUsuarios(api.method).then(resp => {
     if (resp != null) {
        setRegistros(resp) // el resp.data es el array de la respuesta
      } else {
          setTimeout(() => {
            setRegistros([])
          }, 1000)
      }
    })
  }, [])

  if (user.user == null) {
    return (
      <span>Loading...</span>
    )
  } 

  const close = () => {
    Swal.close()
  }


  const agregarUsuario = (e) => {
    e.preventDefault()

    const usuario = document.getElementById('usuario')
    const correo = document.getElementById('correo')
    const tipo = document.getElementById('tipo')
    const userId = document.getElementById('userId')
    const passwd = document.getElementById('passwd')

    const flags = [
      false, // usuario
      false, // correo
      false, // tipo
      false, // userId
      false, // passwd
    ]

    let errors = 0

    if(usuario.value.length < 1) {
      usuario.classList.add('is-invalid')
      flags[0] = false
    } else {
      usuario.classList.remove('is-invalid')
      flags[0] = true
    }

    if(correo.value.length < 1) {
      correo.classList.add('is-invalid')
      flags[1] = false
    } else {
      correo.classList.remove('is-invalid')
      flags[1] = true
    }

    if(tipo.value.length < 1) {
      tipo.classList.add('is-invalid')
      flags[2] = false
    } else {
      tipo.classList.remove('is-invalid')
      flags[2] = true
    }

    if(userId.value.length < 1) {
      userId.classList.add('is-invalid')
      flags[3] = false
    } else {
      userId.classList.remove('is-invalid')
      flags[3] = true
    }

    if(passwd.value.length < 1) {
      passwd.classList.add('is-invalid')
      flags[4] = false
    } else {
      passwd.classList.remove('is-invalid')
      flags[4] = true
    }

    flags.forEach(flag => {
      if(!flag) {
        errors += 1
      }
    })

    if(errors > 0) {
      console.log('Error al enviar formulario!');
      console.log('Errores encontrados: '+errors);
    } else {

      const usuarioModel = {
        idUsuario: usuario.value,
        correoUsu: correo.value,
        tipoUsu: tipo.value,
        idUsuTabla: parseInt(userId.value, 10),
        contrasenaUsu: passwd.value,
        fechaUsu : DateToday
      }

      addUsuario(usuarioModel).then(resp => {
        if(resp.ok) {
          Modal.fire({
            title: <span className="mt-4">¡Usuario modificado!</span>,
            html: (
              <div className="w-100 d-flex flex-column text-center align-items-center">
                <button type="button" className="btn btn-primary mt-3 mb-4" onClick={close}>Aceptar</button>
              </div>
            ),
            showConfirmButton: false
          })
        } else {
          Modal.fire({
            title: <span className="mb-4">¡Error al modificar!</span>,
            html: (
              <div className="w-100 d-flex flex-column text-center align-items-center">
                <span className="lead">Hubo un error al modificar los datos, por favor vuelve a intentarlo.</span>
                <button type="button" className="btn btn-danger mt-4" onClick={() => Swal.close()}>Aceptar</button>
              </div>
            ),
            showConfirmButton: false
          })
        }
      })
    }
  }

  const modificarUsuario = (e) => {
    e.preventDefault()

    const usuario = document.getElementById('usuario2')
    const correo = document.getElementById('correo2')
    const tipo = document.getElementById('tipo2')
    const userId = document.getElementById('userId2')
    const passwd = document.getElementById('passwd2')

    const usuarioModel = {
      idUsuario: usuario.value,
      correoUsu: correo.value,
      tipoUsu: tipo.value,
      idUsuTabla: 0,
      contrasenaUsu: passwd.value,
      fechaUsu : DateToday
    }

    modifyUsuario(usuarioModel).then(resp => {
      if(resp.ok) {
        Modal.fire({
          title: <span className="mt-4">¡Usuario modificado!</span>,
          html: (
            <div className="w-100 d-flex flex-column text-center align-items-center">
              <button type="button" className="btn btn-primary mt-3 mb-4" onClick={close}>Aceptar</button>
            </div>
          ),
          showConfirmButton: false
        })
      } else {
        Modal.fire({
          title: <span className="mb-4">¡Error al modificar!</span>,
          html: (
            <div className="w-100 d-flex flex-column text-center align-items-center">
              <span className="lead">Hubo un error al modificar los datos, por favor vuelve a intentarlo.</span>
              <button type="button" className="btn btn-danger mt-4" onClick={() => Swal.close()}>Aceptar</button>
            </div>
          ),
          showConfirmButton: false
        })
      }
    })

  }

  const eliminarUsuario = (e) => {
    e.preventDefault()

    const usuario1 = document.getElementById('usuario1')

    let errors = 0

    const flags = [
      false // usuario
    ]

    if(usuario1.value.length < 1) {
      usuario1.classList.add('is-invalid')
      flags[0] = false
    } else {
      usuario1.classList.remove('is-invalid')
      flags[0] = true
    }

    flags.forEach(flag => {
      if(!flag) {
        errors += 1
      }
    })

    if(errors > 0) {
      console.log('Error al enviar formulario!');
   } else {

      deleteUsuario(usuario1.value).then(resp => {
        if(resp.ok) {
          Modal.fire({
            title: <span className="mt-4">¡Usuario eliminado!</span>,
            html: (
              <div className="w-100 d-flex flex-column text-center align-items-center">
                <button type="button" className="btn btn-primary mt-3 mb-4" onClick={close}>Aceptar</button>
              </div>
            ),
            showConfirmButton: false
          })
        } else {
          Modal.fire({
            title: <span className="mb-4">¡Error al modificar!</span>,
            html: (
              <div className="w-100 d-flex flex-column text-center align-items-center">
                <span className="lead">El usuario no ha sido encontrado o ha ocurrido un error interno.</span>
                <button type="button" className="btn btn-danger mt-4" onClick={() => Swal.close()}>Aceptar</button>
              </div>
            ),
            showConfirmButton: false
          })
        }
      })
    }
  }

  return (
    <DashboardLayout current={view}>
      <h1 className="mb-4">{title}</h1>
      <Nav menu={menu}>
        <Content id="tab-consulta" defaultView>
          <ul className="list-group">
            <li className="list-group-item active">
              <div className="row text-center">
                <span className="col">Usuario</span>
                <span className="col">Correo</span>
                <span className="col">Tipo</span>
                <span className="col">Fecha</span>
              </div>
            </li>
            {
              registros != null
                ? registros.length > 0
                    ? registros.map(
                        (registro, index) => {
                          const {username, correo, tipo, id, fecha} = registro   // atributos de cada registros, estos son los atributos de cada objeto del arreglo obtenido en la respuesta
                          return (
                            <li className="list-group-item" key={index}>
                              <div className="row text-center">
                                <span className="col">{username}</span>
                                <span className="col">{correo}</span>
                                <span className="col">{tipo}</span>
                                <span className="col">{id}</span>
                                <span className="col">{fecha}</span>
                              </div>
                            </li>
                          )
                        }
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
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card card-shadow">
                <div className="card-body">
                  <h5 className="card-title">Agregar Usuario</h5>
                  <hr className="mt-0 mb-5"/>
                  <div className="row">
                    <div className="col">
                      <form onSubmit={agregarUsuario} className="w-100">
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Usuario</label>
                          <div className="col">
                            <input type="text" name="usuario" id="usuario" className="form-control" placeholder="Usuario" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Correo Electronico</label>
                          <div className="col">
                            <input type="text" name="correo" id="correo" className="form-control" placeholder="usuario@mail.com"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Tipo</label>
                          <div className="col">
                            <input type="text" name="tipo" id="tipo" className="form-control" placeholder="Tipo"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Id asociado a matrona(opcional)</label>
                          <div className="col">
                            <input type="text" name="userId" id="userId" className="form-control" placeholder="1,2,3..."/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Contraseña</label>
                          <div className="col">
                            <input type="password" name="passwd" id="passwd" className="form-control" placeholder=""/>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <button type="submit" className="btn btn-green">Agrega usuario</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Content id="tab-baja">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card card-shadow">
                <div className="card-body">
                  <h5 className="card-title">Eliminar usuarios</h5>
                  <hr className="mt-0 mb-5"/>
                  <div className="row">
                    <div className="col">
                      <form onSubmit={eliminarUsuario} className="w-100">
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Usuario</label>
                          <div className="col">
                            <input type="text" name="usuario1" id="usuario1" className="form-control" placeholder="Usuario"/>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <button type="submit" className="btn btn-green">Guardar cambios</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Content id="tab-modificar">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card card-shadow">
                <div className="card-body">
                  <h5 className="card-title">Modificar usuarios</h5>
                  <hr className="mt-0 mb-5"/>
                  <div className="row">
                    <div className="col">
                      <form onSubmit={modificarUsuario} className="w-100">
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Usuario</label>
                          <div className="col">
                            <input type="text" name="usuario2" id="usuario2" className="form-control" placeholder="Usuario" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Correo Electronico</label>
                          <div className="col">
                            <input type="text" name="correo2" id="correo2" className="form-control" placeholder="usuario@mail.com"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Tipo</label>
                          <div className="col">
                            <input type="text" name="tipo2" id="tipo2" className="form-control" placeholder="Tipo"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-3 col-form-label">Contraseña</label>
                          <div className="col">
                            <input type="password" name="passwd2" id="passwd2" className="form-control" placeholder=""/>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <button type="submit" className="btn btn-green">Agrega usuario</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Nav>
    </DashboardLayout>
  )
}
