import React from 'react'

function page({params}:any) {
  return (
    <div>
        <h1>{params.id}</h1>
    </div>
  )
}

export default page