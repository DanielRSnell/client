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
}
`;
