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
        this.setState({ loading: this.props.icos.ico_main.loading });
        this.PrepareData();
    }

    componentWillUnmount() {
        this.setState({ loading: this.props.icos.ico_main.loading });
    }


    PrepareData() {

        const Values = Object.values(this.props.icos.ico_main.ico_ranked);

        Values.forEach( item => { 
            
            if ( item.id !== null ) {

           data.push(item);

            }

        });
        this.setState({ store: data });
    }

    handleChange(props, options) {
     
        this.setState({loading: true});

        if ( props === 'finished' ) {
        
            this.PrepareFinished();
        
        } else if ( props === 'live' ) {
        
            this.PrepareLive();
        
        } else if ( props === 'upcoming' ) {
        
            this.PrepareUpcoming();
        
        } else {
        
            this.PrepareData();
        
        } 

    }

PrepareFinished() { 
        
            
            const Values = Object.values(this.props.icos.ico_main.ico_finished);
    
            const Finished = [];
    
            Values.forEach( item => { 
                
                if ( item.id !== null ) {
    
               Finished.push(item);
    
                }
    
        });

        this.setState({ store: Finished });
        this.setState({ loading: false });
    }

    PrepareUpcoming() { 
        
        const Values = Object.values(this.props.icos.ico_main.ico_upcoming);

        const Upcoming = [];

        Values.forEach( item => { 
            
            if ( item.id !== null ) {

           Upcoming.push(item);

            }

    });

    this.setState({ store: Upcoming });
    this.setState({ loading: false });
}

    PrepareLive() { 
        
        const Values = Object.values(this.props.icos.ico_main.ico_live);

        const Live = [];

        Values.forEach( item => { 
            
            if ( item.id !== null ) {

           Live.push(item);

            }

    });

    this.setState({ store: Live });

    this.setState({ loading: false });

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
     

        return ( 

<Layout>

 <Row span={24} type="flex" justify="center" className="options-bar">
         
 <Col span={12} push={1}style={{padding: 5}}>
            
        <Select defaultValue="All ICOs" style={{width: 300}} style={{ width: 120 }} onSelect={(value, option) => this.handleChange(value, option)}>
            
            <Option value="all"> All ICOs</Option>

            <Option value="finished">Finished</Option>
            
            <Option value="live">Live</Option>
            
            <Option value="upcoming">Upcoming</Option>
        
        </Select>
                    
    </Col>

    <Col span={12} push={7} style={{padding: 5}}>
    
    <SearchIco className="search-input" data={this.props} placeholder="Search Your Coins" style={{ width: 215 }} />
    
    </Col>

     </Row>

     <Row type="flex" justify="center" span={24}>

        <Col span={22} justify="center" type="flex">
        
            <Content style={{ background: '#fff', padding: 0, margin: 0, minHeight: 280 }}>
        
       <Table
            size="default"
            loading={this.state.loading}
            bordered={false}
            indentSize={20}
            pagination={{ pageSize: 100}}
            dataSource={this.state.store}
            onRowClick={ (item) => this.rowClickHandler(item.name)}
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
                if ( item.finance !== null ) {
                
                if ( item.finance.platform !== '' ) {
                
                    return <span className="table-text">{item.finance.platform}</span>;

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
                
                const CheckTime = m(item.dates.icoEnd).fromNow();
                
                const InvalidTime = m(item.dates.preIcoEnd).fromNow();
                
                const CheckStart = m(item.dates.preIcoStart).fromNow();
                
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
                const CheckTime = m(item.dates.icoStart).fromNow();
                const InvalidTime = m(item.dates.preIcoStart).fromNow();

                const CheckTimeFormat = m(item.dates.icoStart).format('l');
                const InvalidTimeFormat = m(item.dates.preIcoStart).format('l');

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
                const CheckTime = m(item.dates.icoEnd).fromNow();

                const InvalidTime = m(item.dates.preIcoEnd).fromNow();

                const CheckTimeFormat = m(item.dates.icoEnd).format('l');

                const InvalidTimeFormat = m(item.dates.preIcoEnd).format('l');

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
        );
    }
}

export default IcoTable;