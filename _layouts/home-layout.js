import React from 'react'

export default function HomeLayout({children}) {
  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center text-center">
        <div className="col">
          {children}
        </div>
      </div>
    </div>
  )
}
