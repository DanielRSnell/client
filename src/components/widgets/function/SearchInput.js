import React, { Component } from "react";
import { Link, history } from "react-router-dom";
import { Select, Divider } from "antd";

const Option = Select.Option;

class SearchInput extends Component {
  state = {
    data: [],
    value: "",
    store: []
  };

  componentWillMount() {
    if (this.props.data.coins.loading !== true) {
      this.prepSearch();
    }
  }

  prepSearch(value) {
    if (this.props.data.coins.loading === false) {
      const data = this.props.data.coins.allCoinProfiles;

      const Store = [];

      data.forEach(item => {
        if (Store.length < 5) {
          if (item.name && item.symbol !== undefined) {
            const row = `${item.name + "-" + item.symbol}`.toLowerCase();

            if (value !== undefined) {
              const low = value.toLowerCase();

              const check = row.includes(low);

              if (check === true) {
                Store.push({
                  value: `${item.symbol.toUpperCase()}`,
                  text: item.name,
                  id: item.symbol,
                  img: item.cmc,
                  symbol: item.symbol
                });
              }
            }
          }
        }
      });

      this.setState({ data: Store });
    }
  }

  handleChange = (value, id) => {
    this.prepSearch(value);

    this.setState({ value: value });
  };

  OnSelectHandler = (id, symbol) => {
    this.props.data.history.push(`/cryptocurrency/` + id.toUpperCase());
  };

  render() {
    const options = this.state.data.map(item => (
      <Option key={item.value}>
        <Link to={`/cryptocurrency/${item.id}`}>
          {` `}
          <img
            src={
              "https://www.livecoinwatch.com/images/icons32/" +
              item.symbol.toLowerCase() +
              ".png"
            }
          />
          <span className="search-item">
            {` `}
            <strong>
              <Divider type="vertical" /> {item.text}
            </strong>
          </span>
        </Link>
      </Option>
    ));

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
