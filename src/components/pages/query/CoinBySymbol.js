import gql from 'graphql-tag';

export default gql`
query GetCoin($symbol: String!) {
  allCoinProfiles(filter: {
    symbol: $symbol
  }) {
    id
    cmc
    rank
    name
    symbol
    price
    marketcap
    max
    total
    volume
    circulating
    hour
    day
    week
    compareList {
      image
  	}
    compareExchangeses {
      exid
      volumeTo
      open
      high
      low
      exchange
      price
    }
  compareList {
    algo
  	prooftype
  }
  comparePage {
      desc
      website
      twitter
    }
  }
  history(
    symbol: $symbol,
    currency: "USD",
  	limit: 365) {
    time
    open
    high
    low
    close
  }
  coinstats(symbol: $symbol ) {
    id
    display_name
    price_btc
    price_eth
    price_usd
    price_ltc
    market_cap
    supply
    volume
    vwap_h24
    rank
  }
}
`;
