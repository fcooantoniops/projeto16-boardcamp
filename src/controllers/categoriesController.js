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

async function insert(req, res){

    const { name } = req.body;
    if(!name) {
        res.sendStatus(400);
    }

    const { rows } = await connection.query("SELECT COUNT(1) FROM categories WHERE (name) = $1;",[name]);
    if (rows[0].count > "0") {
        return res.sendStatus(409);
    }

    try {
        const result = await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);
        
        //console.log(result);
        if(result.rowCount > 0){
            return res.sendStatus(201);
        }
        return res.sendStatus(404);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { list, insert };