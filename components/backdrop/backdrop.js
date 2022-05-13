import React from 'react'

import styles from './backdrop.module.css'

const backdrop = (props) => (
    props.show ? <button className={styles.backdrop} onClick={props.clicked}>.</button> : null
)

export default backdrop