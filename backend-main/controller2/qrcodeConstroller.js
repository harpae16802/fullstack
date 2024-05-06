

import db from "../utils/db.js";
import fs from 'fs';
import { date } from '../utils/date.js';
import {ISOtodate} from"../utils/day.js"
export async function recordSearch(req, res) {
  const result = { success: false, data: [] };

  const data = "SELECT a.*, b.*, (SELECT p.product_name FROM products p WHERE p.product_id = b.product_id) AS product_name FROM `order_data` a JOIN order_detail b ON a.order_id = b.order_id WHERE a.custom_id = 1;";

  let [rows] = (await db.query(data));
  rows.map((v, i) => {
    v.payment_date = ISOtodate(v.payment_date)
    return v
  })
  result.success = true;
  result.data = rows
  res.send(result)
}
export async function myProduct(req, res) { 
  const custom_id = req.body.custom_id || 1;
  const store_name = req.query.search;
  let search = ` a.custom_id = ${custom_id} `;
  let queryParams = [];
  if (req.query.search) {
    search += ` AND s.store_name LIKE ?`;
    queryParams.push(`%${store_name}%`); // 将带有 '%' 符号的查询参数添加到数组中
  }
  console.log(store_name)
  try {
    const result = { success: false, data: [], title: [] };
    // 更改 custom_id=1
    const data = `
      SELECT 
      a.*,
      b.*, 
        s.store_name   AS seller_name,
        p.product_name AS product_name
        FROM 
            order_data a 
        JOIN 
            order_detail b 
            ON 
            a.order_id = b.order_id 
        JOIN
          seller s
          ON 
          s.seller_id = a.seller_id
        JOIN
          products p
        ON 
        p.product_id = b.product_id
        WHERE 
           ${search} and b.remain_count>0
        ORDER BY 
            a.order_id;
          `;

    let [rows] = await db.query(data, [queryParams]);

    let array = [];

    rows.forEach(v => {
      v.payment_date = ISOtodate(v.payment_date)
      let index = array.findIndex(a => a.length > 0 && a[0].order_id === v.order_id);
      if (index === -1) {
        // 找不到就增加[]
        index = array.length;
        array.push([]);
        result.title.push({ order_id: v.order_id, ...v })
      }
      // 找到了在裡面加資料
      array[index].push({ order_id: v.order_id, ...v });
    });

    result.success = true;
    result.data = array

    res.send(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}
export async function myProduct2(req, res) {

  try {
    const result = { success: false, data: [], title: [] };
    const order_id = req.body.order_id;
    const product_name = req.query.search;
    let search = ` b.order_id = ${order_id} `;
    let queryParams = [];
    if (req.query.search) {
      search += ` AND p.product_name LIKE ?`;
      queryParams.push(`%${product_name}%`); // 将带有 '%' 符号的查询参数添加到数组中
    }
 
    // 更改 custom_id=1 。a.product_id=2
    const data = `
    SELECT 
    a.*,
    b.*, 
     s.store_name AS seller_name,
    p.product_name  AS product_name
      FROM 
          order_data a 
      JOIN 
          order_detail b 
      ON 
          a.order_id = b.order_id 
      JOIN
      seller s
      ON 
      s.seller_id = a.seller_id
      JOIN  products p
      on 
      p.product_id = b.product_id 
      WHERE    ${search} and b.remain_count>0
      
        `;
    let [rows] = await db.query(data, [queryParams]);
    rows.map((v, i) => {
      v.payment_date = ISOtodate(v.payment_date)
      return v
    })


    // 将结果添加到 result.data
    result.data = rows;
    result.success = true;
    // 返回结果
    res.send(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}
export async function insertProduct(req, res) {
  let result = { success: false, data: [] }; 
  const [qr_id] = await max();
  async function max() {
    // 找最大值id
    const max_id = `SELECT max(qrcode_id)as max FROM qrcode_record WHERE 1`;
    const [MaxidResult] = await db.query(max_id);
    return MaxidResult;
  }
  try {
    const data2 = `INSERT INTO qrcode_record ( order_id, custom_id) VALUES (?, ?)`;
    const [insertResult] = await db.query(data2, [req.body[0].order_id, req.body[0].custom_id]);

    //  v.isvalue
    await Promise.all(req.body.map(async (v, i) => {
      // if (insertResult) {
      // 找到qr_id

      console.log(qr_id);
      // 更新數量
      const data4 = `UPDATE order_detail    SET remain_count = ? WHERE order_id = ? and product_id=?;`;
      const countData = +v.remain_count - (+v.isvalue)
      const insertResult2 = await db.query(data4, [countData, v.order_id, v.product_id]);

      if (insertResult2) {
        const dataI = `INSERT INTO qrcode_detail_record (qrcode_id, product_id,count) VALUES (?, ?,?)`;
        console.log(qr_id, v.product_id, v.isvalue);
        const [insertResult] = await db.query(dataI, [qr_id.max, v.product_id, v.isvalue]);


      }
      else {
        return result;
      }
    }))
    // 将结果添加到 result.data 
    result.data = [{ qrcode_id: qr_id.max + 1 }];
    result.success = true;
    // 返回结果
    res.send(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}
