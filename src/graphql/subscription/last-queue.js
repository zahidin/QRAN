import gql from 'graphql-tag'

const SOCKET_LAST_QUEUE = gql `
subscription{
    newQueue{
      number
    }
}`

export default SOCKET_LAST_QUEUE

