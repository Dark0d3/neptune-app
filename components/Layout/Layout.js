import React from "react"

import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

import styles from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.layout__main}>{children}</main> 
      </div>
    </>   
  )
}

export default Layout