import React from 'react'

export default function Content({id, defaultView = false, children}) {
  return (
    <div className={"tab-pane fade" + (defaultView == true ? ' show active' : '')} id={id} role="tabpanel" aria-labelledby="pills-home-tab">
      {children}
    </div>
  )
}
