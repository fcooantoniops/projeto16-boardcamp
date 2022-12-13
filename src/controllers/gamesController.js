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

async function insert(){

}

export { list, insert }