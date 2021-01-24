import { useEffect, useState } from 'react'
import Router from 'next/router';
import '../styles/globals.scss'
import UserContext from '@components/user-context';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({id: null, token: null})

  useEffect(() => {
    const loggedUser = localStorage.getItem('usuario'); // En vez de cookies se almacena en localStorage
    if (loggedUser) {
      const userToken = localStorage.getItem('token'); // En vez de cookies se almacena en localStorage
      setUser({id: loggedUser, token: token})
    } else {
      Router.push('/');
    }
  }, [])

  // Este metodo es para cuando hagas el loggin en el index, si la respuesta es 200 ejecutas este metodo
  const signIn = (username, token) => {
    localStorage.setItem('usuario', username);
    localStorage.setItem('token', token);
    setUser({id: username, token: token})
    Router.push('/matrona')
  }

  // Este metodo es para cuando hagas el loggin en el index, si la respuesta es 200 ejecutas este metodo
  const signOut = () => {
    localStorage.clear();
    setUser({id: null, token: null})
    Router.push('/');
  }

  return (
    <UserContext.Provider value={{ user: user, signIn: signIn, signOut: signOut }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
