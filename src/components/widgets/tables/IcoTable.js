import React, { Component } from 'react';
import { Row, Table, Col, Layout, Tag, Select, Icon } from 'antd';
import n from 'numeral';
import m from 'moment';
import SearchIco from '../function/SearchIco';

const { Content } = Layout;
const { Column } = Table;
const Option = Select.Option;

const data = [];

class IcoTable extends Component {

    state = { 
        store: data,
        loading: false,
        sortedInfo: null,
        filteredInfo: null,
        filterDropdownVisible: false,
        searchText: '',
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
      }

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
          filterDropdownVisible: false,
          filtered: !!searchText,
          data: data.map((record) => {
            const match = record.name.match(reg);
            if (!match) {
              return null;
            }
            return {
              ...record,
              name: (
                <span>
                  {record.name.split(reg).map((text, i) => (
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                  ))}
                </span>
              ),
            };
          }).filter(record => !!record),
        });
      }

    componentWillMount() {
        console.log(this.props);
    }


    tableChange = (pagination, filters, sorter) =>{
    console.log('Various paramaters', pagination, filters, sorter);
    this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
    });
    }

    setDailySort = () => {
    this.setState({
        sortedInfo: {
            order: 'descend',
            columnKey: 'icoEnd',
        },
    });
    }



    ConvertDollar(props) {
        const number = n(props);
        n.defaultFormat(`$0,0`);
        const reFormat = number.format();
        return (<span><strong>{reFormat}</strong></span>);
    }


   rowClickHandler(name) {
    const replaceSpaces = name.replace(/\s+/g, '-').toLowerCase(); 
    this.props.icos.history.push('/ico/' + replaceSpaces);
}

    render() { 

        let { sortedInfo, filteredInfo } = this.state;

        sortedInfo = sortedInfo || {};

        filteredInfo = filteredInfo || {};

        const data = this.props.icos.ico_main.allIcoProfiles;
        
        console.log(this.props);

        return ( 
<div>
{!data && <h1>Loading...</h1>}
<Layout>

     <Row type="flex" justify="center" span={24}>

        <Col span={24} justify="center" type="flex">
        
            <Content style={{ background: '#fff', padding: 0, margin: 0, minHeight: 280 }}>
        
       <Table
            size="default"
            loading={this.state.loading}
            bordered={false}
            indentSize={20}
            pagination={{ pageSize: 100}}
            dataSource={this.props.icos.ico_main.allIcoProfiles}
            onRowClick={ (item) => this.rowClickHandler(item.id)}
            rowKey={item => item.id}
            onChange={this.tableChange}
            >

            <Column
            key='rating'
            width={150}
            title={<strong>RATING</strong>}
            render={item => {    
            if ( item.rating <= 1.9 || null ) {
          
                return (<Tag color="#f50" className="table-tag">{item.rating}</Tag>);
            } else if ( item.rating > 3.9 ) {
               
                return (<Tag color="#87d068" className="table-tag">{item.rating}</Tag>);
            } else { 
               
                return  (<Tag color="#2db7f5" className="table-tag">{item.rating}</Tag>);
    
            } 
        }}
            sorter={(a, b) => a.rating - b.rating}
            sortOrder={sortedInfo.columnKey === 'rating' && sortedInfo.order}
            />
            
            <Column
            key='logo'
            render={item => ( 
            <img className="table-image" src={item.logo} /> ) }
			/>
            
            <Column
            key='name'
            render={ item => (<span><h3>{item.name}</h3></span> )}
            />

            <Column
            title={<strong>PLATFORM</strong>}
            key='platform'
            render={ item => { 
                if ( item.icoFinance !== null ) {
                
                if ( item.icoFinance.platform !== '' ) {
                
                    return <span className="table-text">{item.icoFinance.platform}</span>;

                } else { 
                    
                 return <Tag color="volcano">UNKNOWN</Tag>
            
                }    
                    
            } else {

                return <Tag color="volcano">UNKNOWN</Tag>

                }
             }}
            />

            <Column
            title={<strong>STATUS</strong>}
            key='status'
            render={ item => {
                
                const CheckTime = m(item.end).fromNow();
                
                const InvalidTime = m(item.preend).fromNow();
                
                const CheckStart = m(item.prestart).fromNow();
                
                const CheckUnknown = CheckStart.includes('ago');

                if ( CheckTime !== 'Invalid date' ) {
                    const CheckFinished = CheckTime.includes('ago');

                    if ( CheckFinished === true ) { 

                        return <Tag color="#f50" className="table-tag">FINISHED</Tag>;

                    } else { 

                    return <Tag color="#87d068" className="table-tag">LIVE</Tag>;
                    
                    }

                } else if ( InvalidTime !== 'Invalid date' ) {
                
                    return <Tag color="#2db7f5" className="table-tag">UPCOMING</Tag>;
                
                } else if ( CheckUnknown === true ) { 
                    
                    return <Tag color="#2db7f5" className="table-tag">UPCOMING</Tag>;    
                    
                } else { 
                    return <Tag color="volcano">UNKNOWN</Tag>;
                
                }
            }}
            
            />
            <Column
            title={<strong>START</strong>}
            key='icoStart'
            render={ item => {
                const CheckTime = m(item.start).fromNow();
                const InvalidTime = m(item.prestart).fromNow();

                const CheckTimeFormat = m(item.start).format('l');
                const InvalidTimeFormat = m(item.prestart).format('l');

                if ( CheckTime !== 'Invalid date' ) {
                    return <span className="table-date">{CheckTimeFormat}</span>
                } else if ( InvalidTime !== 'Invalid date' ) {
                    return <span className="pre-start"> {InvalidTimeFormat}</span>
                } else { 
                    return <Tag color="volcano">UNKNOWN</Tag>;
                }
            }}
            />
            <Column
            title={<strong>END</strong>}
            key='icoEnd'
            render={ item => {
                const CheckTime = m(item.end).fromNow();

                const InvalidTime = m(item.preend).fromNow();

                const CheckTimeFormat = m(item.end).format('l');

                const InvalidTimeFormat = m(item.preend).format('l');

                if ( CheckTime !== 'Invalid date' ) {
                    return <span className="table-date">{CheckTimeFormat}</span>
                } else if ( InvalidTime !== 'Invalid date' ) {
                    return <span className="pre-start">{InvalidTimeFormat}</span>
                } else { 
                    return <Tag color="volcano">UNKNOWN</Tag>;
                }
            }}
            
            />
            </Table>
            </Content>
            </Col>
         </Row>
         </Layout>
        }
        </div>
        );
    }
}

export default IcoTable;