import gql from 'graphql-tag'

const DIFFERENCE_QUEUE = gql `
query($number:String!){
  difference(number:$number){
    number
  }
}
`

export default DIFFERENCE_QUEUE