import React from "react"
import Link from 'next/link'

import styles from './Sidebar.module.css'

const Sidebar = () => {

  return (
    <>
        <div className={styles.sidebar}>
            <div className={styles.sidebar__nav_links}>
                <Link 
                    href="/dashboard">
                    <a className={styles.sidebar__nav_links__text}>OVERVIEW</a>
                </Link>
                <div className={styles.sidebar__nav_links__divider}></div>
                <Link 
                    href="/dashboard/mainevents">
                    <a className={styles.sidebar__nav_links__text}>EVENTS</a>
                </Link>
                <div className={styles.sidebar__nav_links__divider}></div>
                <Link 
                    href="/dashboard/subevents">
                    <a className={styles.sidebar__nav_links__text}>SUBEVENTS</a>
                </Link>
                <div className={styles.sidebar__nav_links__divider}></div>
                <a
                    className={styles.sidebar__nav_links__text} 
                    href="/api/auth/logout">LOGOUT</a>
            </div>
        </div>
    </>   
  )
}

export default Sidebar