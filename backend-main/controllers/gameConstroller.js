import db from "../utils/db.js";
// 如果fs和path被用到的話，也應該要將它們轉為import形式，這裡暫時註釋掉，因為您的功能中未使用它們。
// import fs from "fs";
// import path from "path";

export async function gamePassSelect01(req, res) {
    const t_sql = `SELECT * FROM clear_data a JOIN achievement_category b ON a.level_id=b.level_id`;
    try {
        const [totalRows] = await db.query(t_sql);
        return res.send(totalRows);
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}