import db from "../utils/db.js";
import fs from 'fs';
import path from 'path';
import  { ISOtodate } from "../utils/day.js"; 
import {achieveLevel} from "../utils/pass.js"
// 通關 achievement
// 
// 已使用 order
const getChtimes = (v) => {
    let action = '';
    switch (v) {
        case 1: action = "一"; break;
        case 2: action = "二"; break;
        case 3: action = "三"; break;
        case 4: action = "四"; break;
        case 5: action = "五"; break;
        default: action = "無數"; break;
    }
    return action;
}

export async function selectGained2Ticket01(req, res) {
    const userId = req.body.custom_id || 1;
    const sql = `SELECT  level_id,count(*)as level_count ,max(play_date) as play_date  FROM clear_data  WHERE user_id=${userId} group by level_id`;  
    try {
        const res1 = await db.query(sql); 
        let level_count_arr = [];
        // return res.send( res1);
        res1[0].map((v, i) => { 
                    level_count_arr.push({ ...v, play_date:  `最新時間:${ISOtodate(v.payment_date)}`, level_id: `第${getChtimes(v.level_id)}關`, level_count: `第${getChtimes(v.level_count)}次通關` })
        });
        res.send({ success: true, data: level_count_arr });
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
}

export async function selectGained2Ticket02(req, res) {
    const userId = req.body.custom_id || 1;
    const sql1 = `SELECT level_id, COUNT(user_id) AS number_count FROM clear_data WHERE user_id=${userId} GROUP BY level_id`;

    let res2NewArr = [];
    try {
        let result1 = (await db.query(sql1))[0];
        if (!result1) {
            return res.json({ success: false, error: "Error in signup query" });
        }
     
        await Promise.all(result1.map(async (v, i) => {
            if (v.number_count > 0) {
                let sql12 = `SELECT * FROM achievement_category WHERE level_id = ${v.level_id} AND clear_times <= ${v.number_count};`;
                let result1 = await db.query(sql12); 
                res2NewArr = [...res2NewArr, ...result1[0]]
            }
        }));

        res2NewArr = res2NewArr.map((v, i) => { 
            return ({ ...v, level_id: `第${getChtimes(v.level_id)}關`, level_count: `第${getChtimes(v.clear_times)}次通關`})
        });
        res.json({ success: true, data: res2NewArr });
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred while processing the request" });
    };
}
export async function maxTicket(req, res) {
    const userId = req.body.custom_id || 1;
    const sql = `SELECT max(level_id) as level_id  FROM clear_data  WHERE user_id=${userId}`;  
    try {
        const res1 = await db.query(sql); 
     
        res.send({ success: true, data: getChtimes(res1[0][0].level_id) });
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
}
