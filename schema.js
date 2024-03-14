const { gql } = require('apollo-server');

const typeDefs = gql`
    type Car {
        id: ID
        model: String!
        fuel_type: String!
        num_of_sold: Int
    }
    type Query {
        cars: [Car]
    }
`;

module.exports = { typeDefs }; 