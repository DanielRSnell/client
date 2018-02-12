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
    coinCap {
      volume
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
    compareReddit {
      active
      dailyComments
      dailyPosts
      link
      subscribers
    }
    compareTwitter {
      followers
      link
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
