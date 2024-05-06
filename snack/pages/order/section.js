import React from 'react'

export default function Section({ children }) {
  return (
    <>
      <div className="section" style={{overflow:'hidden'}}>{children}</div>
    </>
  )
}
