import db from "../utils/db.js";
import fs from "fs";
import path from "path";


// 產品加入購物車
export async function showProduct(req, res) {
    const sql = "SELECT  order_data (`order_id, order_number`,`custom_id`,`seller_id`,`discount_category_id`,`consume_gamepoint`,`total_sum`,`payment`) VALUES (?)";
    const values = [
        req.body.order_id,
        req.body.order_number,
        req.body.custom_id,
        req.body.seller_id,
        req.body.discount_category_id,
        req.body.consume_gamepoint,
        req.body.total_sum,
        req.body.payment,
    ];
    try {
        const [result] = await db.query(sql, [values]);
        return res.send({ status: "Success" });
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}
