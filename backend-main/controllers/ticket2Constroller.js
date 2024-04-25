import db from "../utils/db.js";
import { ISOtodate } from "../utils/day.js"; 
// 通關 achievement
// 
// 已使用 order
const getChtimes = (v) => {
    let action = '';
    switch (v) {
        case 1: {
            action = "一";
            break; 
        }
        case 2: {
            action = "二";
            break; 
        }
        case 3: {
            action = "三";
            break; 
        }
        case 4: {
            action = "四";
            break; 
        }
        case 5: {
            action = "五";
            break; 
        }
        default: {
            action = "無數";
            break;
        }
    }
    return action;
}

 
  export const selectGained2Ticket01 = async (req, res) => { 
 
        const userId = req.body.userId || 1;
        const sql = `select a.*,count(level_id) as level_count from clear_data a where user_id=${userId} GROUP by level_id`;
        await db.query(sql)
            .then((res2) => {
                if (!res2) {
                    return res.json({ success: false, error: "Error in signup query" });
                } else { 
                    let level_count_arr = [];
                    res2[0].map((v, i) => {
                        if (v.level_count) {
                            Array(v.level_count).fill(1).forEach((v2, i2) => {
                                level_count_arr.push({ ...v, play_date2: ISOtodate(v.payment_date2), level_id: `第${getChtimes(v.level_id)}關`, level_count: `第${getChtimes(i2 + 1)}次通關` })
                            })
                        }
                    })
                    return res.send({ success: true, data: level_count_arr });
                }
            })
            .catch((err) => {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ error: "An error occurred while processing the request" });
            });
    }
  export const selectGained2Ticket02 = async (req, res) => {  
        const userId = req.body.userId || 1;
        const sql1 = `SELECT level_id, COUNT(user_id) as number_count FROM clear_data WHERE user_id=${userId} GROUP BY level_id`;
        let res2NewArr = [];
        try { 
            let result1 = (await db.query(sql1))[0];
            if (!result1) {
                return res.json({ success: false, error: "Error in signup query" });
            }
            await Promise.all(result1.map(async(v, i) => {  
                if (v.number_count > 0) { 
                    let sql12 = `SELECT * FROM achievement_category WHERE level_id =${v.level_id} and clear_times<=${v.number_count};`;
                    result1 = await db.query(sql12);  
                    res2NewArr = [...res2NewArr, ...result1[0]];
                }
            }));
            res2NewArr = res2NewArr.map((v, i) => { 
                return ({ ...v, level_id: `第${getChtimes(v.level_id)}關`, level_count: `第${getChtimes(v.clear_times)}次通關` });
            });
            return res.json({ success: true, data: res2NewArr }); 
        } catch (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        };
    }
 
