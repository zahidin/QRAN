import gql from 'graphql-tag'

const LIST_QUEUE = gql `
query{
    listQueue{
      operator
      number
      id
    }
  }
`

export default LIST_QUEUE