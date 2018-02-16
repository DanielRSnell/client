import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin, Layout, Row, Col } from 'antd';
import IcoTable from '../widgets/tables/IcoTable';
import n from 'numeral';
import m from 'moment';
import mixpanel from 'mixpanel-browser';

const { Content } = Layout;

class IcoList extends Component { 

    state = {
        loading: false,
    }

    InitMix() {
        console.log(`Mixpanel`);
        mixpanel.init('d7b8b0e988ae095fe996e068780eac11');
        mixpanel.track("Page View", {"Page": "ICO List"});
      }

    render() {
        
        if ( this.props.ico_main.loading ) {

            console.log(`props is loading`);

            
            return (
            
            <div className="example">    
                  <Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!">
      
                    </Spin>
                    </div>
                  );
        
        } else {

            console.log(`Data has loaded`);
            console.log(this.props);

        }

        return ( 
        <Content style={{margin: 10}}>
        {this.InitMix()}
        <Row className="ico-table">
            <IcoTable icos={this.props} />
        </Row>
        </Content>
        );
    
    }
}

const query = gql`
query IcoCoinProfiles {
  allIcoProfiles {
    id
    name
    rating
    logo
    start
    end
    prestart
    preend
    icoFinance {
      platform
    }
  }
}
`;

export default graphql(query, {name: 'ico_main' })(IcoList);