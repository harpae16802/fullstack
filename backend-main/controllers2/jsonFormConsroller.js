// controllers/jsonFormController.js
import db from "../utils/db.js";
import fs from 'fs';
import path from 'path';

// 插入產品資料到資料庫
export const jsonFormTa = async (req, res) => {
    const sql = "INSERT INTO products (`author`, `bookname`, `category_sid`, `image`) VALUES (?)";
    const values = [
        req.body.author,
        req.body.bookname,
        req.body.category_sid,
        req.file.filename
    ];
    try {
        const [result] = await db.query(sql, [values]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "Insertion failed" });
        } else {
            return res.status(200).send({ status: "Success", id: result.insertId });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
};

// 處理圖片上傳，存儲圖片並回傳詳細資訊
export const ImgFormTa = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'false', data: "No file uploaded" });
    }
    res.status(200).json({ status: "success", file: req.file });
};

// 插入會員資料到資料庫
export const insertMemberForm = async (req, res) => {
    const sql = "INSERT INTO custom (`custom_password`, `custom_nickname`, `custom_descript`, `custom_sex`, `custom_name`, `custom_year`, `custom_month`, `custom_date`) VALUES (?)";
    const values = [
        req.body.custom_password,
        req.body.custom_nickname,
        req.body.custom_descript,
        req.body.custom_sex,
        req.body.custom_name,
        req.body.custom_year,
        req.body.custom_month,
        req.body.custom_date
    ];
    try {
        const [result] = await db.query(sql, [values]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "Insertion failed" });
        } else {
            return res.status(200).send({ status: "Success", memberId: result.insertId });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
};

// 更新會員資料
export const updateMemberForm = async (req, res) => {
    const sql = "UPDATE custom SET custom_password = ?, custom_nickname = ?, custom_descript = ?, custom_sex = ?, custom_name = ?, custom_year = ?, custom_month = ?, custom_date = ? WHERE custom_id = ?";
    const values = [
        req.body.custom_password,
        req.body.custom_nickname,
        req.body.custom_descript,
        req.body.custom_sex,
        req.body.custom_name,
        req.body.custom_year,
        req.body.custom_month,
        req.body.custom_date,
        req.body.custom_id
    ];
    try {
        const [result] = await db.query(sql, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Update failed, member not found" });
        } else {
            return res.status(200).send({ status: "Success" });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
};
