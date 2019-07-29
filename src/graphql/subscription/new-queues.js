import gql from 'graphql-tag'

const SOCKET_QUEUES = gql `
subscription{
    newQueues{
      hash
      operator
      number
      time
    }
  }`

export default SOCKET_QUEUES
