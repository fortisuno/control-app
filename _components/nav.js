import React, {useEffect} from 'react'

export default function Nav({menu, children}) {
  useEffect(()=> {
    const {Tab} = require('bootstrap')
    var triggerTabList = [].slice.call(document.querySelectorAll('#nav-tab a'))
    triggerTabList.forEach(function (triggerEl) {
      var tabTrigger = new Tab(triggerEl)

      triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        tabTrigger.show()
      })
    })
  }, [])

  return (
    <>
      <ul className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
        {
          menu.map((item, index) => (
            <li className="nav-item" role="presentation" key={index}>
              <a className={"nav-link" + (index == 0 ? ' active' : '')} id="pills-contact-tab" data-bs-toggle="pill" href={'#' + item.href} role="tab" aria-controls="pills-contact" aria-selected="false">{item.name}</a>
            </li>
          ))
        }
      </ul>
      <div className="tab-content" id="tabContent">
        {children}
      </div>
    </>
  )
}
