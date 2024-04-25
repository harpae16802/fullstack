import db from "../utils/db.js";
import fs from "fs";
import path from "path";

export async function jsonFormTa(req, res) {
    const sql = "INSERT INTO products (`author`,`bookname`,`category_sid`,`image`) VALUES (?)";
    const values = [
        req.body.author,
        req.body.bookname,
        req.body.category_sid,
        req.file.filename
    ];

    try {
        const [result] = await db.query(sql, [values]);
        return res.send({ status: "Success" });
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}

export async function ImgFormTa(req, res) {
    const values = req.body.custom_id || 1;
    if (!req.file) {
        return res.json({ status: 'false', data: "No file uploaded" });
    }
    const sql = `UPDATE custom SET custom_image=? WHERE custom_id=?`;
    try {
        const [result] = await db.query(sql, ["http://127.0.0.1:3006/images/" + req.file.filename, values]);
        res.json({ status: "Success", data: req.file.filename });
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}

export async function insertMemberForm(req, res) {
    const sql = "INSERT INTO custom (`custom_password`,`custom_nickname`,`custom_descript`,`custom_sex`,`custom_name`,`custom_year`,`custom_month`,`custom_date`) VALUES (?)";
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
    try {
        const [result] = await db.query(sql, [values]);
        return res.send({ status: "Success" });
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}

export async function updateMemberForm(req, res) {
    const sql = "UPDATE custom SET custom_account=?, custom_password=?, custom_nickname=?, custom_sex=?, custom_name=?, custom_year=?, custom_month=?, custom_date=?, custom_phone=?, custom_address=? WHERE custom_id=?";
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
        req.body.custom_address,
        req.body.custom_id || 1
    ];
    try {
        await db.query(sql, values);
        return res.send({ status: "Success" });
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}

export async function deleteMemberForm(req, res) {
    // Add your implementation here if needed
}

export async function selectCustom(req, res) {
    const sql = "SELECT * FROM custom WHERE custom_id=1";
    try {
        const [results] = await db.query(sql);
        return res.send({ success: true, data: results[0] });
    } catch (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
}

     // res.json({status:'Success',data:{
            
        //     originalname: req.file.originalname,
        //     filename: req.file.filename, // 获取改名后的文件名
        //     mimetype: req.file.mimetype,
        //     size: req.file.size
        //   }});

