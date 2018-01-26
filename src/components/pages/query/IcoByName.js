import gql from 'graphql-tag';

export default gql`
query IcoBySymbol($symbol: String!) {
    ico_byName(name: $symbol) {
      id
      name
      desc
      logo
      image
      tagline
      premium
      raised
      all_time_roi
      about
      rating
      country
      url
      intro
      ratingProduct
      ratingProfile
      ratingTeam
      ratingVision
      coin_symbol
      dates {
        icoEnd
        icoStart
        preIcoEnd
        preIcoStart
      }
      categories {
        id
        name
      }
      exchanges {
        id
        logo
        name
        price
        roi
      }
      finance {
        token
        accepting
        hardcap
        softcap
        tokens
        tokentype
        platform
        distributed
        bonus
      }
      links {
        bitcointalk
        discord
        facebook
        github
        medium
        reddit
        slack
        telegram
        twitter
        whitepaper
        www
        youtube
      }
      team {
        group
        iss
        links
        name
        photo
        title
      }
      ratings {
        agree
        date
        name
        photo
        product
        profile
        review
        team
        title
        vision
        weight
      }
      milestones{
        title
        content
      }
    }
  }`;
