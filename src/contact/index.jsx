import React from 'react'
import { useLocation } from 'react-router-dom'
function Contact() {
    const test = useLocation()
    console.log(test);
    
    
  return (
    <div>
        hello Contact {test.state.index}

    </div>
  )
}

export default Contact