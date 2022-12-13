import { connection } from "../db/database.js";

async function list(req, res){
    const { cpf } = req.query;
    try {
        
        if(!cpf){
            const customers = await connection.query("SELECT * FROM customers;");
            return res.send(customers.rows);
        }

        const customers = await connection.query("SELECT * FROM customers WHERE cpf LIKE $1;", [`${cpf}%`]);
        return res.send(customers.rows);
    } catch (error) {
        console.log(error);
        resizeBy.sendStatus(500);
    }
}

async function insert(req, res){
    
    const { name, phone, cpf, birthday } = req.body;

    if(!name|| !phone || !cpf || !birthday){
        return res.sendStatus(404);
    }

    try {
        const { rows } = await connection.query(
            "SELECT COUNT(1) FROM customers WHERE (cpf) = $1;",[cpf]
        );
        if (rows[0].count > "0") {
            return res.sendStatus(409);
        }
        
        const result = await connection.query(
            "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4);",[name, phone, cpf, birthday]
        );
        if(result.rowCount > 0){
            return res.sendStatus(201);
        }
        return res.sendStatus(404);
    } catch (error) {
        console.log(error);
        resizeBy.sendStatus(500);
    }
}

async function update(req, res){
    try {
        
    } catch (error) {
        console.log(error);
        resizeBy.sendStatus(500);
    }
}

export { list, insert, update };