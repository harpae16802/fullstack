import db from "../utils/db.js";
import fs from 'fs';
import path from 'path';


export const jsonFormTa = async (req, res) => {

    // 將表單資料存入資料庫
    const sql = "insert into products (`author`,`bookname`,`category_sid`,`image`)values(?)";
    const values = [
        req.body.author,
        req.body.bookname,
        req.body.category_sid,
        req.file.filename
    ];
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

    // 上傳圖片資料 
    const values = req.body.custom_id || 1;
    if (!req.file) {
        return res.json({ status: 'false', data: "沒有資料" });
    }
    // 更新圖片路徑至資料庫
    const sql = `UPDATE custom SET custom_image=? WHERE custom_id=?`;
    await db.query(sql, ["http://127.0.0.1:3006/images/" + req.file.filename, values])
        .then((res2) => {
            if (!res2) {
                return res.json({ error: "Error in signup query" });
            }
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
    res.json({ status: "Success", data: req.file.filename });
}
export const getImgFormTa = async (req, res) => {

    // 取得圖片資料 
    const results = { status: "Success", result: null };
    const values = req.body.custom_id || 1;

    // 查詢資料庫以取得圖片路徑
    const sql = `select custom_image from custom WHERE custom_id=?`;
    await db.query(sql, values)
        .then((res2) => {
            if (!res2) {
                return res.json({ error: "Error in signup query" });
            }
            results.result = res2[0][0].custom_image;
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
    res.send(results);
}
export const insertMemberForm = async (req, res) => {

    // 新增會員資料
    const { idInputErr, passwordErr, } = req.body;
    const sql = "insert into custom (`custom_password`,`custom_nickname`,`custom_descript`,`custom_sex`,`custom_name`,`custom_year`,`custom_month`,`custom_date`)values(?)";
    const values = [
        req.body.custom_password,
        req.body.custom_nickname,
        req.body.custom_descript,
        req.body.custom_sex,
        req.body.custom_name,
        req.body.custom_year,
        req.body.custom_month,
        req.body.custom_date,
    ];
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

    // 更新會員資料
    try {
        const sql = "UPDATE custom SET custom_account=?, custom_password=?, custom_nickname=?, custom_sex=?, custom_name=?, custom_year=?, custom_month=?, custom_date=?, custom_phone=?, custom_address=? WHERE custom_id=?";
        const custom_id = req.body.custom_id || 1;
        const values = [
            req.body.custom_account,
            req.body.custom_password,
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
export const deleteMemberForm = async (req, res) => {


}
export const selectCustom = async (req, res) => {

    // 查詢會員資料
    const custom_id = req.body.custom_id || 1;
    const sql = "select * from custom where custom_id=?";
    await db.query(sql, custom_id)
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
}

