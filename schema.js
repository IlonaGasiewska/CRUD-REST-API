const { gql } = require('apollo-server');

const typeDefs = gql`
  type Car {
    id: ID
    model: String!
    fuel_type: String!
    num_of_sold: Int
  }
 
  type Order {
    id: ID
    status: String
    customer_name: String
    products: String
    created_date: String
  }
 
  type Query {
    cars: [Car]
    orders: [Order]
  }
 
  type Mutation {
    createOrder(status: String!, customer_name: String!, products: String!, created_date: String!): Order
    deleteOrder(id: ID!): Order
    updateOrder( status: String!, customer_name: String!, products: String!, created_date: String!, id:ID!): Order
  }
`;

module.exports = { typeDefs }; 