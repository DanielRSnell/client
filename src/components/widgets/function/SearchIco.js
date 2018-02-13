import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Select, Divider } from 'antd';

const Option = Select.Option;

class SearchIco extends Component {
  state = {
    data: [],
    value: '',
    store: [],
  }

  componentDidMount() {
    this.prepSearch();
  }
  
  prepSearch() {
    const Values = Object.values(this.props.data.icos.ico_main);

    console.log(Values);

    const Store = [];
    const Arr = [];
    Store.push({ value: ''+'1',
                  text: ''});
    Values.forEach(item => {

      if ( item !== null ) {
        const itemName = item.name.toUpperCase();
        const replaceSpaces = itemName.replace(/\s+/g, '-').toLowerCase(); 
        
        Arr.push({ value: itemName + '1',
                     uid: replaceSpaces,
                     name: item.name,
                     id: item.id, 
                     img: item.logo,
                    text: item.name });
      }
      if ( Store < 5 ) {
        const itemName = item.name.toUpperCase();
        const replaceSpaces = itemName.replace(/\s+/g, '-').toLowerCase(); 
        
        Store.push({ value: itemName + '1',
                     uid: replaceSpaces,
                     name: item.name,
                     id: item.id, 
                     img: item.logo,
                    text: item.name });
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
        Store.push(item);
      }
    } else {
      console.log('Results are full');
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

  ClickHandler(props) {

    const replaceSpaces = props.replace(/\s+/g, '-').toLowerCase(); 
    return `/ico/${replaceSpaces}`;
  }

  OnSelectHandler = (value, option) => {
    const Format = value.replace(/\s+/g, '-').toLowerCase();
    const reFormat = Format.replace(/1/g, '');
    this.props.data.icos.history.push(`/ico/` + reFormat);
  }

  render() {
    
    const options = this.state.data.map(item => 
      <Option key={item.value}>
     <Link to={`/ico/${item.uid}`}>
      {` `}<img className="search-image" src={item.img} />
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

export default SearchIco;