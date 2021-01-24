import UserContext from '@components/user-context'
import HomeLayout from '@layouts/home-layout'
import Router from 'next/router'
import React, { useContext, useEffect } from 'react'

export default function Home() {

  const {user} = useContext(UserContext)

  useEffect(() => {
    if(user.id != null) {
      Router.push('/matrona')
    }
  }, [user])

  return <span>Loaging...</span>
}
