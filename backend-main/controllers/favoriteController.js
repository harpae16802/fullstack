import db from "../utils/db.js";
import fs from 'fs';
import path from 'path';
import { date } from '../utils/date.js';
import { ISOtodate } from "../utils/day.js"
export async function favoriteDel01Product(req, res) {
    const values = req.body.favorite_id;
    const sql = `DELETE FROM favorite_product WHERE favorite_id=?`;

    try {
        const res2 = await db.query(sql, values);
        if (!res2) {
            return res.json({ error: "Error in signup query" });
        } else {
            const values2 = req.body.custom_id;
            const sql = `SELECT created_at, favorite_id, (SELECT product_name FROM products WHERE product_id=favorite_product.product_id) AS product_name, (SELECT custom_name FROM custom WHERE custom_id=favorite_product.custom_id) AS custom_name FROM favorite_product WHERE custom_id=?`;
            const res2 = await db.query(sql, values2);
            if (!res2) {
                return res.json({ error: "Error in signup query" });
            } else {
                return res.send({ status: "Success", data: res2[0] });
            }

        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}

export async function favoriteSearch01Product(req, res) {
    // const values = req.body.custom_id || 1;
    // const values = req.body.custom_id;
    const custom_id = req.body.custom_id || 1;
    const store_name = req.query.search;
    let search = ` a.custom_id = ${custom_id} `;
    let queryParams = [];
    if (req.query.search) {
      search += ` AND s.store_name LIKE ?`;
      queryParams.push(`%${store_name}%`); // 将带有 '%' 符号的查询参数添加到数组中
    }
    console.log(store_name)
    const sql = `SELECT created_at, favorite_id, (SELECT product_name FROM products WHERE product_id=favorite_product.product_id) AS product_name, (SELECT custom_name FROM custom WHERE custom_id=favorite_product.custom_id) AS custom_name FROM favorite_product WHERE custom_id=?`;
    try {
        let [res2] = await db.query(sql, values);
        if (!res2) {
            return res.json({ error: "Error in signup query" });
        } else {

            res2 = res2.map((v, i) => {
                console.log(v)
                v.created_at = ISOtodate(v.created_at);
                return v;
            })
            return res.send({ status: "Success", data: res2 });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}

export async function favoriteDel02Store(req, res) {
    const values = req.body.favorite_id;
    const sql = `DELETE FROM favorite_store WHERE favorite_id=?`;

    try {
        const result = await db.query(sql, values);
        if (!result) {
            return res.json({ error: "Error in signup query" });
        } else {
            const values2 = req.body.custom_id || 1;
            const sql2 = `SELECT created_at, favorite_id, (SELECT store_name FROM seller WHERE seller_id=favorite_store.seller_id) AS seller_id, (SELECT custom_name FROM custom WHERE custom_id=favorite_store.custom_id) AS custom_name FROM favorite_store WHERE custom_id=?`;
            const result2 = await db.query(sql2, values2);
            if (!result2) {
                return res.json({ error: "Error in signup query" });
            }
            return res.send({ success: true, data: result2[0] });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}


export async function favoriteSearch02Store(req, res) {
    const values = req.body.custom_id;
    const sql = `SELECT created_at, favorite_id, (SELECT store_name FROM seller WHERE seller_id=favorite_store.seller_id) AS seller_id, (SELECT custom_name FROM custom WHERE custom_id=favorite_store.custom_id) AS custom_name FROM favorite_store WHERE custom_id=?`;

    try {
        let [res2] = await db.query(sql, values);
        if (!res2) {
            return res.json({ error: "Error in signup query" });
        } else {
            res2 = res2.map((v, i) => {
                v.created_at = ISOtodate(v.created_at);
                return v;
            })
            return res.send({ success: true, data: res2 });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}
