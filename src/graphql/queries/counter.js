import gql from 'graphql-tag'

const COUNTER = gql `
query($number:String!){
	counter(number:$number){
    number
  }
}`

export default COUNTER
