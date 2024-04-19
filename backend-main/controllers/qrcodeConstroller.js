import db from "../utils/db.js";
import {ISOtodate} from '../utils/day.js'; 


export async function recordSearch(req, res) {
  const result = { success: false, data: [] };
  const data = "SELECT DISTINCT o.order_id FROM orders o JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id where o.custom_id=1";
  let [rows] = await db.query(data);

  for (const v of rows) {
    const data2 = `SELECT o.order_id, o.custom_Id, od.order_quantity, od.product_id, p.product_name FROM orders o JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id where o.custom_id=1 && o.order_id=${v.order_id}`;
    let [row2] = await db.query(data2);
    console.log(row2);
    result.data.push([...row2]);
  }
  res.send(result);
}
export async function myProduct(req, res) {
  try {
    const result = { success: false, data: [] };
    const data = `
      SELECT a.*, b.*, (SELECT product_name FROM products WHERE products.product_id = a.product_id) AS product_name
      FROM order_detail a
      JOIN order_data b ON a.order_id = b.order_id
    `;
    let [rows] = await db.query(data);

    const newData = await Promise.all(rows.map(async (row) => {
      let totalcount = 0;
      const qrcorded = `
        SELECT SUM(count) AS sumcount
        FROM qrcode_detail_record
        WHERE order_id = ${row.order_id} AND product_id = ${row.product_id}
        ORDER BY count
      `;
      let [rowsa] = await db.query(qrcorded);
      if (+rowsa[0].sumcount > 0) {
        totalcount = +row.purchase_quantity - (+rowsa[0].sumcount);
      } else {
        totalcount = row.purchase_quantity;
      }
      row.payment_date = ISOtodate(row.payment_date);
      return { ...row, sumcount: rowsa[0].sumcount, totalcount };
    }));

    result.data = newData;
    result.success = true;
    res.send(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}
export async function myProduct2(req, res) {
  try {
    const result = { success: false, data: [] };
    const product_id = 2;  // Assuming this should be dynamic in future implementations
    const data = `
      SELECT a.*, b.*, (SELECT product_name FROM products WHERE products.product_id = ?) AS product_name
      FROM order_detail a JOIN order_data b ON a.order_id = b.order_id
      WHERE a.product_id = ?
    `;
    let [rows] = await db.query(data, [product_id, product_id]);

    const newData = await Promise.all(rows.map(async (row) => {
      let totalcount = 0;
      const qrcorded = `
        SELECT SUM(count) AS sumcount
        FROM qrcode_detail_record
        WHERE order_id = ? AND product_id = ?
        ORDER BY count
      `;
      let [rowsa] = await db.query(qrcorded, [row.order_id, product_id]);
      totalcount = rowsa[0].sumcount ? row.purchase_quantity - (+rowsa[0].sumcount) : row.purchase_quantity;
      row.payment_date = ISOtodate(row.payment_date);
      let rowCountarr = Array(totalcount).fill(1).map((v, i) => i + 1);

      return { ...row, sumcount: rowsa[0].sumcount, rowCountarr, totalcount };
    }));

    result.data = newData;
    result.success = true;
    res.send(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}
export async function insertProduct(req, res) {
  try {
    const result = { success: false, data: [] };
    // 更改 custom_id=1 。a.product_id=2
    const data = `SELECT a.*, b.*, (SELECT product_name FROM products WHERE products.product_id = a.product_id) AS product_name FROM order_detail a JOIN order_data b ON a.order_id = b.order_id where a.product_id=2`;
    let [rows] = await db.query(data);
    const newData = await Promise.all(rows.map(async (row) => {
      let totalcount = 0;
      const qrcorded = `
                  SELECT SUM(count) AS sumcount
                  FROM qrcode_detail_record
                  WHERE order_id = ${row.order_id} AND product_id = 2
                  ORDER BY count
              `;
      let [rowsa] = await db.query(qrcorded);
      if (+rowsa[0].sumcount > 0) {
        totalcount = +row.purchase_quantity - (+rowsa[0].sumcount);
      } else {
        totalcount = row.purchase_quantity
      }
      row.payment_date = ISOtodate(row.payment_date);
      let rowCountarr = Array(totalcount).fill(1).map((v, i) => i + 1);

      return { ...row, sumcount: rowsa[0].sumcount, rowCountarr, totalcount };
    }));
    // 将结果添加到 result.data
    result.data = newData;
    result.success = true;
    // 返回结果
    res.send(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}
