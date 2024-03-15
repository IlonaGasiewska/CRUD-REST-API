const port = process.env.PORT || require('./configs/config').port
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const db = require('./routes/queries');

const { pool } = require('./routes/queries');

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

const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');

const resolvers = {
    Query: {
        orders: async () => {
            try {
                const result = await pool.query('SELECT * FROM orders');
                return result.rows;
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
                throw error;
            }
        },
    },
    Mutation: {
        createOrder: async (_, { status, customer_name, products, created_date }) => {
            try {
                const result = await pool.query('INSERT INTO orders (status, customer_name, products, created_date) VALUES ($1, $2, $3, $4) RETURNING *', [status, customer_name, products, created_date]);
                return result.rows[0];
            } catch (error) {
                console.error('Error while creating an order:', error);
                throw error;
            }
        },
        deleteOrder: async (_, { id }) => {
            try {
                const result = await pool.query(`DELETE FROM orders WHERE id = ${id}`)
                return result.rows[0];
            } catch (error) {
                console.error('Error while deleting an order', error);
                throw error;
            }
        },
        updateOrder: async (_, { status, customer_name, products, created_date, id }) => {
            try {
                const result = await pool.query(`UPDATE orders SET status = $1, customer_name=$2, products=$3, created_date=$4 WHERE id=${id} RETURNING *`, [status, customer_name, products, created_date]);
                return result.rows[0];
            } catch (error) {
                console.error('Error while updating an order', error);
                throw error;
            }
        },
    },
};


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