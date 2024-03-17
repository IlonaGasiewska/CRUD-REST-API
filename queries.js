const config_db = require("./configs/db_config");

const Pool = require('pg').Pool;
const pool = new Pool(config_db);

const getCars = (request, response) => {
    pool.query(`SELECT * FROM cars ORDER BY model`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getCarById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM cars WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error.message;
        }
        response.status(200).json(results.rows)
    })
}

const createCar = (request, response) => {
    const { model, fuel_type, num_of_sold } = request.body;

    pool.query(`INSERT INTO cars (model, fuel_type, num_of_sold) VALUES ('${model}', '${fuel_type}', '${num_of_sold}')`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Car added with ID: ${results.insertId}`);
    });
}

const updateCar = (request, response) => {
    const id = parseInt(request.params.id);
    const { model, fuel_type, num_of_sold } = request.body;

    pool.query(
        `UPDATE cars SET model='${model}', fuel_type='${fuel_type}', num_of_sold='${num_of_sold}' WHERE id=${id}`,
        (error, results) => {
            if (error) {
                throw error.message;
            }
            response.status(200).send(`Car modified with ID: ${id}`);
        }
    );
}

const deleteCars = (request, response) => {
    const id = request.params.id

    pool.query(`DELETE FROM cars WHERE id='${id}'`, (error, results) => {
        if (error) {
            throw error
        }
        response.send(`Car deleted with ID: ${id}`)
    })
}

module.exports = { getCars, getCarById, createCar, updateCar, deleteCars, pool };