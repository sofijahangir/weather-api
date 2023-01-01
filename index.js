const axios = require('axios');
require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});
(async () => {
    await client.connect();
    await client.query('CREATE  TABLE WEATHER(city varchar(30),details json)');
})();
// Make request using axios libray
/**
 * this api takes 2 query params
 * 1.api key for weather api = 636f19420c254948aa862247231501
 * you can get this key by signing up on weather api or use mine
 * 2.city denoted by q
 *
 */

// Use ORM to save data in database

// Test

// test

// Test test

// todo: use orm
const cities = ['delhi', 'srinagar', 'surat', 'jaipur'];
save(cities);
async function save(cities) {
    try {
        for (let i = 0; i < cities.length; i++) {
            const res = await axios.get(
                `http://api.weatherapi.com/v1/current.json?key=636f19420c254948aa862247231501&q=${cities[i]}`
            );
            const weatherData = JSON.stringify(res.data.current);
            const query = `INSERT INTO WEATHER VALUES ('${cities[i]}','${weatherData}')`;
            await client.query(query);
        }
        const data = await client.query(`SELECT city,details FROM WEATHER`);
        console.log('================SAVE COMPLETE======================');
        console.log(data.rows);
        await edit('jaipur', 'pink-city');
    } catch (err) {
        console.log(`Error in api call : ${err}`);
    }
}
async function edit(old, newData) {
    try {
        await client.query(
            `UPDATE WEATHER SET city = '${newData}' where city = '${old}'`
        );
        const result = await client.query(`SELECT city,details from weather`);
        console.log('================EDIT COMPLETE======================');
        console.log(result.rows);
        await del(newData);
    } catch (err) {
        console.log(err);
    }
}
async function del(key) {
    try {
        await client.query(`DELETE FROM WEATHER  where city = '${key}'`);
        const result = await client.query(`SELECT city,details from weather`);
        console.log('================DELETE COMPLETE======================');
        console.log(result.rows);
    } catch (err) {
        console.log(err);
    } finally {
        await client.end();
    }
}
