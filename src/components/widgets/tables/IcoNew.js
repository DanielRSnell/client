import React, { Component } from 'react';
import { Table, Row, Col, Layout, Tag } from 'antd';
import { History } from 'react-router-dom';
import m from 'moment';
import n from 'numeral';

const { Content } = Layout;
const { Column } = Table;

class IcoNew extends Component {

    state = {
        loading: false,
    }


    componentWillMount() {

        console.log(this.props);

    }

    render() {

        return ( 

   <Row type="flex" span={24} justify="center">
            
        <Col span={20}>
            
            <Content style={{ background: '#fff', padding: 0, margin: 0, minHeight: 280 }}>
            
            <Table
            size="default"
            bordered={false}
            indentSize={20}
            pagination={{ pageSize: 100}}
            dataSource={this.state.store}
            onRowClick={ (item) => this.rowClickHandler(item.name)}
            rowKey={item => item.id}
            onChange={this.handleChange}
            >
            
            <Column
            title={<strong>COIN NAME</strong>}
            key='name'
            render={ item => { return <strong> <h3>{item.name} </h3> </strong> }}
            />

            </Table>

            </Content>

        </Col>

    </Row>

        );
    }
}

export default IcoNew;