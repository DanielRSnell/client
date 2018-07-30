import React, { Component } from 'react'

const statusStyle = {
    background: "red",
    padding: "1rem"
}

const textStyle = {
    fontSize: "20px",
    color: "white"
}

class Status extends Component {

    render() {
        return (
            <div style={statusStyle}>
                <span style={textStyle}>Due to API changes, Pages are currently down.</span>
            </div>
        )
    }
}