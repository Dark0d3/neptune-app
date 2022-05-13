import React from "react"
import styles from './Spinner.module.css'

const Spinner = () => {

    return (
        <>
            <div 
                className={styles.loader}
                style={{marginBottom: "100%", textAlign: "center"}}>
                Loading...
            </div>
        </>
    )
}

export default Spinner