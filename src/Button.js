import React from 'react'

function Button({type, buttonHandler, show, idName}) {
  return ( 
    <button className={type} id={idName} onClick={() => buttonHandler(show)}>
      {show}
    </button>
  )
}

export default Button