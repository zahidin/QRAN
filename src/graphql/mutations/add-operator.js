import gql from 'graphql-tag'

const ADD_OPERATOR = gql `
mutation($number: String!) {
    addOperator(number: $number) {
      number
      operator
      hash
      time
    }
  }
`

export default ADD_OPERATOR