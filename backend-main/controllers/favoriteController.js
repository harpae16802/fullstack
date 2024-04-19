import db from "../utils/db.js";

 
export async function favoriteDel01Product(req, res) {
        const values = req.body.favorite_id;
        const sql = `DELETE FROM favorite_product WHERE favorite_id=?`;

        try {
            const [result] = await db.query(sql, values);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No favorite product found with given ID" });
            }
            return res.send({ status: "Success" });
        } catch (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        }
    } 
    export async function  favoriteSearch01Product(req, res) {
        const values = req.body.favorite_id;
        const sql = `SELECT * FROM favorite_product WHERE favorite_id=?`;

        try {
            const [results] = await db.query(sql, values);
            if (results.length === 0) {
                return res.status(404).json({ error: "No favorite product found with given ID" });
            }
            return res.send({ status: "Success", data: results });
        } catch (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        }
    } 
    export async function favoriteDel02Store(req, res) {
        const values = req.body.favorite_id;
        const sql = `DELETE FROM favorite_store WHERE favorite_id=?`;

        try {
            const [result] = await db.query(sql, values);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No favorite store found with given ID" });
            }
            return res.send({ status: "Success" });
        } catch (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        }
    } 
    export async function favoriteSearch02Store(req, res) {
        const values = req.body.favorite_id;
        const sql = `SELECT * FROM favorite_store WHERE favorite_id=?`;

        try {
            const [results] = await db.query(sql, values);
            if (results.length === 0) {
                return res.status(404).json({ error: "No favorite store found with given ID" });
            }
            return res.send({ status: "Success", data: results });
        } catch (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        }
    }
 