import gql from 'graphql-tag'

const SOCKET_DIFFERENCE = gql `
subscription($number:String!){
    newDifference(number:$number){
      number
    }
}`

export default SOCKET_DIFFERENCE
