import React from "react"

const Modal = ({ content, show }) => {

    const modalStyle = show===1 ? {display: "block"} : {display: "none"}

    return(
        <div className="modal" style={modalStyle}>
            {content}
        </div>
    )
}

export default Modal