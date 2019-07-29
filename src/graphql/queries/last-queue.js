import gql from 'graphql-tag'

const LAST_QUEUE = gql `
query{
    lastQueue{
      number
    }
  }
`

export default LAST_QUEUE