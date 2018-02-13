import gql from 'graphql-tag';

export default gql`
query icoprofiles($symbol: ID!) {
  IcoProfile(id: $symbol ) {
    id
		name
    logo
    desc
    about
    tagline
    intro
    rating
    ratingTeam
    ratingVision
    ratingProduct
    ratingProfile
    start
    end
    prestart
    preend
    icoCategories {
      id
      name
    }
    icoExchanges {
      id
      name
      logo
    }
  	icoTeams {
      id
      name
      title
      photo
      iss
    }
    icoRatings {
      photo
      name
      date
      review
      product
      team
      profile
      vision
    }
    icoFinance {
      token
      platform
      tokentype
      accepting
      tokens
      distributed
      softcap
      hardcap
    }
    milestones {
      id
      title
      content
    }
    icoLinks {
      www
      slack
      bitcointalk
      telegram
      whitepaper
      github
      medium
      facebook
      twitter
      video
    }
  }
}`;
