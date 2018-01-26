import React, { Component } from 'react';
import { Link, history } from 'react-router-dom';
import { Select, Divider } from 'antd';

const Option = Select.Option;

class SearchInput extends Component {
  state = {
    data: [],
    value: '',
    store: [],
  }

  componentDidMount() {
    this.prepSearch();
  }
  
  prepSearch() {
    
    const Values = Object.values(this.props.data.coins.coins_rank);
    
    const Store = [];
    const Arr = [];
    Store.push({ value: ''+'1',
                  text: ''});
    Values.forEach(item => {

      if ( item !== null ) {
        const itemName = item.name.toUpperCase();
        const itemSymbol = item.symbol.toUpperCase();
        
        Arr.push({ value: itemSymbol + '1',
                     id: item.symbol, 
                     img: `https://files.coinmarketcap.com/static/img/coins/16x16/${item.img}.png`,
                    text: item.name + ' ' +`( ${item.symbol} )`});
      }
      if ( Store < 5 ) {
        const itemName = item.name.toUpperCase();
        const itemSymbol = item.symbol.toUpperCase();
        Store.push({ value: itemName + ' ' + itemSymbol + '1',
                     id: item.symbol, 
                     img: `https://files.coinmarketcap.com/static/img/coins/16x16/${item.img}.png`,
                    text: item.name + ' ' +`( ${item.symbol} )`});
      }

    });
    this.setState({ data: Store });
    this.setState({ store: Arr });
  }

  handleChange = (value, id) => {
   

      this.prepSearch();

    const arr = Object.values(this.state.store);

    const Store = [];

    arr.forEach( item => {

    if (Store.length < 5 ) {
      const itemName = value.toString().toUpperCase();

      const results = item.value.includes(itemName);

      if ( results === true ) {
        console.log(Store.length);
        Store.push(item);
        console.log(item);
      }
    }
    });
    if ( value === '' ) {
      this.setState({data: Store});
      this.setState({ value });   
     
      } else { 

        this.setState({data: Store});
        this.setState({ value });  
        
      }
  }

  OnSelectHandler = (id, value, option) => {
    const Format = id.replace(/\s+/g, '-').toLowerCase();
    const reFormat = Format.replace(/1/g, ''); 
    this.props.data.history.push(`/cryptocurrency/` + reFormat);
  }

  render() {
    console.log(`Search Component`);
    const options = this.state.data.map(item => 
      <Option key={item.value}>
     <Link to={`/cryptocurrency/${item.id}`}>
      {` `}<img src={item.img} />
      <span className="search-item">{` `}<strong><Divider type="vertical" />{' '}{item.text}</strong></span>
      </Link>
      </Option>
    );
  
    return (
      <Select
        mode="combobox"
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        onSelect={this.OnSelectHandler}
      >
        {options}
      </Select>
    );
  }
}

export default SearchInput;