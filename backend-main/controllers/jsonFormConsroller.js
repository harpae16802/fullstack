import db from "../utils/db.js";
// import { ISOtodate } from "../utils/day.js";
import { date } from '../utils/date.js';
import bcrypt from "bcryptjs";
export const jsonFormTa = async (req, res) => {
    const sql = "insert into products (`author`,`bookname`,`category_sid`,`image`)values(?)"
    const values = [
        req.body.author,
        req.body.bookname,
        req.body.category_sid,
        req.file.filename
    ]
    await db.query(sql, [values])
        .then((res2) => {
            if (!res2) {
                return res.json({ error: "Error in signup query" });
            } else {
                return res.send({ status: "Success" });
            }
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
}
export const ImgFormTa = async (req, res) => {
    // const customId = req.body.custom_id || 1; // Default to 1 if custom_id is not provided
    const customId = req.body.custom_id; // Default to 1 if custom_id is not provided
    if (!req.file) {
        // Send a 400 Bad Request if no file is found in the request
        return res.status(400).json({ status: 'false', data: "沒有資料" });
    }

    // Log the received file name for debugging 
    const imageUrl = `http://127.0.0.1:3002/images/${req.file.filename}`;
    const sql = "UPDATE custom SET custom_image = ? WHERE custom_id = ?";

    try {
        // Execute the SQL query
        const [results] = await db.query(sql, [imageUrl, customId]);

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).json({ status: 'false', data: "No record updated" });
        }

        // Success response with the filename of the uploaded image
        return res.json({ status: "Success", data: req.file.filename });
    } catch (err) {
        // Log the error and send a 500 Internal Server Error response
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
};



export const getImgFormTa = async (req, res) => {

    // 圖片資料 
    const results = { status: "Success", result: null }
    // const values = req.body.custom_id||1; 
    const values = req.body.custom_id || 1;
    // favorite_product 
    const sql = `select custom_image from custom   WHERE custom_id=?`
    await db.query(sql, values)
        .then((res2) => {
            if (!res2) {
                return res.json({ error: "Error in signup query" });
            }
            results.result = res2[0][0].custom_image

        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });

    return res.send(results)
}
export const insertMemberForm = async (req, res) => {
    // 新增顧客資料
    const { idInputErr, passwordErr, } = req.body
    const sql = "insert into custom (`custom_password`,`custom_nickname`,`custom_descript`,`custom_sex`,`custom_name`,`custom_year`,`custom_month`,`custom_date`)values(?)"
    const values = [
        req.body.custom_password,
        req.body.custom_nickname,
        req.body.custom_descript,
        req.body.custom_sex,
        req.body.custom_name,
        req.body.custom_year,
        req.body.custom_month,
        req.body.custom_date,
    ]
    await db.query(sql, [values])
        .then((res2) => {
            if (!res2) {
                return res.json({ status: 401, error: "Error in signup query" });
            } else {
                return res.send({ status: "Success" });
            }
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
}
export const updateMemberForm = async (req, res) => {
    try {
        const sql = "UPDATE custom SET custom_account=?, custom_password=?, custom_nickname=?, custom_sex=?, custom_name=?, custom_year=?, custom_month=?, custom_date=?, custom_phone=?, custom_address=? WHERE custom_id=?";
        const custom_id = req.body.custom_id || 1;
        const hashedPassword = await bcrypt.hash(req.body.custom_password, 10);
        const values = [
            req.body.custom_account,
            hashedPassword,
            req.body.custom_nickname,
            req.body.custom_sex,
            req.body.custom_name,
            req.body.custom_year,
            req.body.custom_month,
            req.body.custom_date,
            req.body.custom_phone,
            req.body.custom_address || "",
            custom_id
        ];
        await db.query(sql, values);
        return res.send({ status: "Success" });
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}
export const selectCustom = async (req, res) => {
    const custom_id = req.body.custom_id || 1;
    const sql = "select * from custom where custom_id=?"
    await db.query(sql, [custom_id])
        .then((res2) => {
            if (!res2) {
                return res.json({ success: false, error: "Error in signup query" });
            } else { 
                return res.send({ success: true, data: res2[0]});
            }
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });


}