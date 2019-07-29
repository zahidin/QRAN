import gql from 'graphql-tag'

const SOCKET_COUNTER = gql `
subscription{
    newCounter{
      number
    }
  }`

export default SOCKET_COUNTER
