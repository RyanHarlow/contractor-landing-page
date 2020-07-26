const { Pool, Client } = require('pg')


const addLead = (name, phone, email, message) => {

    var timestamp = Number(new Date())
    var date = new Date(timestamp)

    const pool = new Pool();

    sqlQuery = 'INSERT INTO lead (name, phone, email, message, date) values ($1, $2, $3, $4, $5)';
    sqlValues = [name, phone, email, message, date];

    pool.query(sqlQuery, sqlValues, (err, res) => {
        console.log(err, res);
        pool.end();
        if (err) {
            return { err: err }
        } else {
            return { success: res }
        }
    })

}


module.exports = { addLead: addLead };