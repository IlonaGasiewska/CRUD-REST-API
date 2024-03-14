const port = process.env.PORT || require('./configs/config').port
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const db = require('./routes/queries');
const db_data = require('./db_data');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/car/:id', db.getCarById);
app.post('/car', db.createCar);
app.put('/car/:id', db.updateCar);
app.delete('/car/:id', db.deleteCars);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


const { ApolloServer, gql } = require('apollo-server');

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

// const resolvers = {
//     Query: {
//         cars: async () => {
//             try {
//                 const result = await app.get('/cars', db.getCars);
//                 return result.rows;
//             } catch (error) {
//                 console.error('Błąd podczas pobierania danych:', error);
//                 throw error;
//             }
//         },
//     },
// }; <---- Niedziała

// const resolvers = {
//     Query: {
//         cars: async () => {
//             try {
//                 return db_data.cars
//             } catch (error) {
//                 console.error('Błąd podczas pobierania danych:', error);
//                 throw error;
//             }
//         },
//     },
// }; < ---- Działa

const {
    ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});