import gql from 'graphql-tag'

const ADD_QUEUE = gql `
mutation($ip: String!, $number: String!, $time: String!) {
  addQueue(ip: $ip, number: $number, time: $time) {
    success
  }
}
`

export default ADD_QUEUE