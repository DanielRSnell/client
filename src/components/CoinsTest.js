import React, { Component } from 'react';

class Test extends Component {

    render() {

        if ( this.props.data.coins_rank.loading ) {
            console.log(`The data is still loading...`);
        } else {
            console.log(`The data has loaded`);
            console.log(this.props);
        }
        return ( <div>This is just a test component... </div> );
    }
}

export default Test;