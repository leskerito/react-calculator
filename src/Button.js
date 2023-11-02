import React from 'react'

function Button({type, buttonHandler, show, id}) {
  console.log(show)
  return ( 
    <button className={'button '+ type} id={id} onClick={() => buttonHandler(show)}>
      {show}
    </button>
  )
}

export default Button