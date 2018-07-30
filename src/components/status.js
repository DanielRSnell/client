import React, { Component } from 'react'

const statusStyle = {
    background: "red",
    padding: ".5rem"
}

const textStyle = {
    fontSize: "16px",
    color: "white"
}

class Status extends Component {

    render() {
        return (
            <div style={statusStyle}>
                <center><span style={textStyle}>Due to API changes, Currency Pages are currently down.</span></center>
            </div>
        )
    }
}

export default Status;