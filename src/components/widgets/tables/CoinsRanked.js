import React, { Component } from 'react';
import { Router, history } from 'react-router-dom';
import { Row, Col, Layout, Table, Select, Button } from 'antd';
import axios from 'axios';
import n from 'numeral';


const { Content } = Layout;
const { Column } = Table;

var ChartData = [];

class CoinsRanked extends Component {

        state = { 
            data: null,
            loading: false,
            PageSize: 100,
            filteredInfo: null,
            sortedInfo: null,
        }

          handleChange = (value) => {
            this.setState({ value });
            fetch(value, data => this.setState({ data }));
          }

        // Error Handling

        componentDidCatch(error, info) {
            
            // Is there an error?
            console.log(error);
            
            // Tell about it if so!
            console.log(info);
        }

        componentDidMount() {
            console.log(`Component is updated`);
            this.setState({loading: false});
        }


    handleChange = (pagination, filters, sorter) =>{
        console.log('Various paramaters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    componentWillMount() {
        this.setState({ loading: true });
        this.setState({ PageSize: 100 });
        this.CreateTable();
    }

    CreateTable() {

        const Values = Object.values(this.props.data.coins.coins_rank);
        

        Values.forEach( item => {
            
            if ( item !== null ) {

                ChartData.push(item);
                
            }

        });

        this.setState({ data: ChartData });


    }

    FormatInt(props) {

        const number = n(props);
        const format = number.format('0,0');
        const reFormat = number.value();
        return (<span><strong>{format}</strong></span>);

    }
   

   priceColor(props) {
    if ( props !== null ) {
     
        if ( props !== undefined ) {

        const itemName = props.toString();

        const checkStatus = itemName.includes("-");

            if ( checkStatus !== true ) {

                    return (<span><strong><font color="green">{props}</font> %</strong></span>)
            
                } else {

                return (<span><strong><font color="red">{props}</font> %</strong></span>);
            
            }

        } else { 

            return (<span><strong><font color="gray">{props}</font> %</strong></span>);
        
        }
    }    
} 

   ConvertDollar(props) {
       const number = n(props);
       n.defaultFormat(`$0,0.00`);
       const reFormat = number.format();
       return (<span><strong>{reFormat}</strong></span>);
   }

   LargeConvertDollar(props) {
    const convertNumber = parseInt(props);
    const number = n(convertNumber);
    n.defaultFormat(`$0,0`);
    const reFormat = number.format();
    return (<span><strong>{reFormat}</strong></span>);
}


   CheckSymbol(props) {
       if ( props !== 'MIOTA' ) {
           return ( <span>( <strong>{props}</strong> ) </span> )
       } else {
           return ( <span>( <strong>IOT</strong> ) </span> )
       }
    }

   rowClickHandler(symbol) {

        if ( symbol !== 'MIOTA'){
        this.props.data.history.push('/cryptocurrency/' + symbol);
        } else {
            this.props.data.history.push('/cryptocurrency/IOT');
        }
    }

    render() {
        
        let { sortedInfo, filteredInfo } = this.state;

        sortedInfo = sortedInfo || {};

        filteredInfo = filteredInfo || {};
     
        return (
       // <div> This is a test div </div>
        <Row type="flex" span={24} justify="center">
            
            <Col span={20} value={5}>
            <Content style={{ background: '#fff', padding: 0, margin: 0, minHeight: 280 }}>
        
            <Table
            loading={this.state.loading}
            size="default"
            bordered={false}
            indentSize={20}
            pagination={{ pageSize: 100}}
            dataSource={this.state.data}
            onRowClick={ (item) => this.rowClickHandler(item.symbol)}
            rowKey={item => item.id + '-' + item._rank}
            onChange={this.handleChange}
            >

            <Column
            key='rank'
            title="RANK"
            render={item => {return <center><span><h3>{item._rank}</h3></span></center>;}}
            />
            
            <Column
                key='id'
				render={item => (
		    <center><img src={ 
            'https://files.coinmarketcap.com/static/img/coins/32x32/' + item.img + '.png' }/>
        </center> )}
								/>

            <Column
            key='name'
            render={item => ( <span><h3>{item.name}</h3></span> )}
            />
            
            <Column
            key='volume'
            title="VOLUME"
            render={item => { return this.LargeConvertDollar(item.volume) }}
            />

            <Column
            key='market_cap_usd'
            title="MARKET CAP"
            render={item => { return this.LargeConvertDollar(item.market_cap_usd); }}
            />

            <Column
            key='price_usd'
            title="PRICE"
            render={item => { return this.ConvertDollar(item.price_usd) }}
            />
            
            <Column
            key='percent_change_1h'
            title="HOUR"
            render={item => {  return this.priceColor(item.percent_change_1h); }}
            />
            
            <Column
            key='percent_change_24h'
            title="DAILY"
            render={item => { return this.priceColor(item.percent_change_24h); }}
            />
            
            <Column
            key='percent_change_7d'
            title="WEEKLY"
            render={item => { return this.priceColor(item.percent_change_7d); }}
            />
            
            <Column
            key='symbol'
            title="TICKER"
            render={item => { return this.CheckSymbol(item.symbol); }}
            />
            </Table>
            </Content>
            </Col>
        </Row>
            );
         
    }
}
// bd6fec8442ff471fb5bfc3d813abfccf
export default CoinsRanked;