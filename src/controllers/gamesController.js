import { connection } from "../db/database.js";

async function list(req, res){
    let name = "";
    if (req.query.name !== undefined) {
        name = req.query.name.toLowerCase();
    }

    try {
        
        const games = await connection.query(`
            SELECT 
                games.*, categories.name AS "categoryName" 
            FROM
                games 
            JOIN 
                categories ON games."categoryId" = categories.id
            WHERE 
                LOWER(games.name) ILIKE $1;`, [`${name}%`]
        );
        res.send(games.rows);
    } catch (error) {
        console.log(error);
        resizeBy.sendStatus(500);
    }
}

async function insert(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    if(!name || !image || !stockTotal || !categoryId || !pricePerDay || stockTotal <= 0 || pricePerDay <= 0){
        return res.sendStatus(404);
    }

    try {
        let { rows } = await connection.query("SELECT COUNT(1) FROM games WHERE (name) = $1;",[name]);
        if (rows[0].count > "0") {
            return res.sendStatus(409);
        }

        ({ rows } = await connection.query("SELECT COUNT(1) FROM categories WHERE (id) = $1;",[categoryId]));
        if (rows[0].count === "0") {
            return res.sendStatus(400);
        }

        const result = await connection.query(
        'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
        [name, image, stockTotal, categoryId, pricePerDay]);
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