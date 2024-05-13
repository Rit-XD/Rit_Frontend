import React from 'react'

export const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  )
}
