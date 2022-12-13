import { connection } from '../db/database.js';

async function list(req, res){

    try {        
        const categories = await connection.query('SELECT * FROM categories;');
        res.send(categories.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { list };