const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    database: 'fuel',
    host: '192.168.86.129',
    port: 5432
});

module.exports = pool;