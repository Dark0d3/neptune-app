import React, { useEffect, useState } from "react"

const SendMessageModal = ({ location, event, onConfirmHandler, _close }) => {

    const [phone, setPhone] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        setBody(`${event} reported in ${location}! Respond Immediately`)
    }, [location, event, setBody])

    return(
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "12px",
            }}
            >
            <p>Send Message</p>    
            <input 
                placeholder="Enter Phone Number"
                onChange={(e) => setPhone(e.target.value)}  
                style={{
                    marginBottom: "12px",
                    padding: "8px 6px",
                    borderRadius: "4px",
                }} 
                />
            <input  
                placeholder="Enter Message Body"
                value={body}
                onChange={(e) => setBody(e.target.value)} 
                style={{
                    marginBottom: "12px",
                    padding: "8px 6px",
                    borderRadius: "4px",
                }} 
                />
            <button
                style={{
                    width: "auto",
                    border: "none",
                    backgroundColor: "#00c4cc",
                    color: "#FFF",
                    borderRadius: "6px",
                    padding: "8px 12px"
                }} 
                onClick={() => {
                    onConfirmHandler(phone, body)
                    _close()
                }}>Send</button>
        </div>
    )
}

export default SendMessageModal