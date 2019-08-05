import gql from 'graphql-tag'

const LOGOUT_USER = gql `
mutation($number:String!){
    logoutUser(number:$number){
      success
    }
}`

export default LOGOUT_USER