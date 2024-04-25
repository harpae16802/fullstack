import db from "../utils/db.js";
import fs from 'fs';
import path from 'path';
import { ISOtodate } from "../utils/day.js";


export const selectGainedTicket01 = async (req, res) => {
    const userId = req.body.userId || 1;

    try {
        const sql = `SELECT a.*, (
            SELECT b.play_date
            FROM clear_data b
            WHERE b.user_id = ${userId} AND a.level_id = b.level_id
            LIMIT 1
        ) AS play_date
        FROM achievement_category a 
        WHERE a.clear_times <= (
            SELECT COUNT(b.user_id)
            FROM clear_data b
            WHERE b.user_id = ${userId} AND a.level_id = b.level_id
        );`;
        let [result1] = await db.query(sql);

        const sql2 = `SELECT * FROM order_data a JOIN custom b ON a.custom_id=b.custom_id and a.custom_id=${userId}`;
        let [result2] = await db.query(sql2);

        result2 = result2.map((v, i) => {
            return { ...v, payment_date: ISOtodate(v.payment_date) };
        });
        result1 = result1.map((v, i) => {
            return { ...v, payment_date: ISOtodate(v.payment_date) };
        });

        if (!result1 || !result2) {
            return res.json({ success: false, error: "Error in signup query" });
        }
        const allResult = [...result1, ...result2];
        allResult.sort((a, b) => a.payment_date.localeCompare(b.payment_date));
        res.json({ allResult });

    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    };
};

export const selectGainedTicket02 = async (req, res) => {
    const userId = req.body.userId || 1;

    const sql = `SELECT a.*, (
        SELECT b.play_date
        FROM clear_data b
        WHERE b.user_id = ${userId} AND a.level_id = b.level_id
        LIMIT 1
    ) AS play_date
    FROM achievement_category a 
    WHERE a.clear_times <= (
        SELECT COUNT(b.user_id)
        FROM clear_data b
        WHERE b.user_id = 1 AND a.level_id = b.level_id
    );`;

    await db.query(sql)
        .then((res2) => {
            if (!res2) {
                return res.json({ success: false, error: "Error in signup query" });
            } else {
                res2[0] = res2[0].map((v, i) => {
                    return { ...v, play_date: ISOtodate(v.payment_date) };
                });
                return res.send({ success: true, data: res2[0] });
            }
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
};

export const selectGainedTicket03 = async (req, res) => {
    const userId = req.body.userId || 1;

    const sql = `SELECT * FROM order_data a JOIN custom b ON a.custom_id=b.custom_Id and b.custom_Id=${userId}`;
    await db.query(sql)
        .then((res2) => {
            if (!res2) {
                return res.json({ success: false, error: "Error in signup query" });
            } else {
                res2[0] = res2[0].map((v, i) => {
                    return { ...v, payment_date: ISOtodate(v.payment_date) };
                });
                return res.send({ success: true, data: res2[0] });
            }
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
};

export const selectry = async (req, res) => {
    const sql = `SELECT * FROM customerall_count WHERE 1`;
    await db.query(sql)
        .then((res2) => {
            if (!res2) {
                return res.json({ success: false, error: "Error in signup query" });
            } else {
                return res.send({ success: true, data: res2[0] });
            }
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
};
