import gql from 'graphql-tag';

export default gql`
query CoinBySymbol($symbol: String!) {
  coin_bySymbol(symbol: $symbol) {
    profile {
         id
        rank
        name
        symbol
        price_usd
        price_btc
        market_cap_usd
        max_supply
        total_supply
        available_supply
        percent_change_1h
        percent_change_24h
        percent_change_7d
    }
    details {
      volume
    }
  }
  coin_byProfile(symbol: $symbol) {
    profile {
      Algorithm
      CoinName
      FullName
      FullyPremined
      Id
      ImageUrl
      Name
      PreMinedValue
      ProofType
      SortOrder
      Symbol
      TotalCoinsFreeFloat
      TotalCoinSupply
      Url
    }
    details{
      TotalCoinsMined
      AggregatedData {
        HIGH24HOUR
        LOW24HOUR
        PRICE
        VOLUME24HOUR
      }
      Exchanges {
        MARKET
        OPEN24HOUR
        HIGH24HOUR
        LOW24HOUR
        PRICE
        VOLUME24HOUR
      }
    }
    snapshot {
      General {
        AffiliateUrl
        Features
        Description 
      }
    }
    social {
      Reddit {
        active_users
        comments_per_day
        link
      	posts_per_day
        subscribers
      }
      Twitter {
        followers
        link
      }
    }
  }
   coin_charts(symbol: $symbol) {
      time
      open
      high
      low
      close
      volumeto
      volumefrom
  }
}
`;
