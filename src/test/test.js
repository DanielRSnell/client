import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Test extends Component {

    state = {
        name: null
    }


    ColoredNumber(props) {
        
       const itemName = props.toString(); 
       const check = itemName.includes("-");

        if ( check === true ) {
            
            return <font color="Red">{props}</font>;
        
        } else {

            return <font color="Green">{props}</font>;
        }

    }

    render() {
        console.log(this.props);
        if ( this.props.coins.loading === true ) {
        return (
            <div className="container">
                This is loading....
                </div>

            );
        } else { 
            
            console.log(this.props.coins.CoinProfile.node.name);
        
        }


        return ( 

            <div className="container">
            <ul>
            <li>{this.props.coins.CoinProfile.node.name}</li>
            <li> {this.props.coins.CoinProfile.node.price}</li>
            <li> {this.ColoredNumber(this.props.coins.CoinProfile.node.hour)}%</li>
            <li> {this.ColoredNumber(this.props.coins.CoinProfile.node.day)}%</li>
            <li> {this.ColoredNumber(this.props.coins.CoinProfile.node.week)}%</li>
            </ul>
            </div>

        );
    }
}

const query = gql`
subscription UpdateCoin {
    CoinProfile(filter: {
      mutation_in: [UPDATED]
    }) {
      updatedFields
      node {
        id
        name
        price
        day
        hour
        week
      }
    }
  }
`;

export default graphql(query, {name: 'coins' })(Test);