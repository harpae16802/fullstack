import db from "../utils/db.js";
import { ISOtodate } from "../utils/day.js"; 

 
  export const recordSearch = async (req, res) => { 
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
  export const myProduct = async (req, res) => {

 
    const custom_id = req.body.custom_id || 1;
    try {
      const result = { success: false, data: [], title: [] };
      const data = `
      SELECT 
      a.*,
      b.*, 
        (SELECT p.store_name FROM seller p WHERE p.seller_id = a.seller_id) AS seller_name,
      (SELECT p.product_name FROM products p WHERE p.product_id = b.product_id) AS product_name
        FROM 
            order_data a 
        JOIN 
            order_detail b 
        ON 
            a.order_id = b.order_id 
        WHERE 
            a.custom_id = ${custom_id}
        ORDER BY 
            a.order_id;
          `;
      let [rows] = await db.query(data);

      let array = [];
      rows.forEach(v => {
        let index = array.findIndex(a => a.length > 0 && a[0].order_id === v.order_id);
        if (index === -1) {
          index = array.length;
          array.push([]);
          result.title.push({ order_id: v.order_id, ...v })
        }
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
  export const myProduct2 = async (req, res) => { 
    try {
      const result = { success: false, data: [] };
      const order_id = req.body.order_id;
      console.log(order_id)
      const data = `
      SELECT 
      a.*,
      b.*, 
        (SELECT p.store_name FROM seller p WHERE p.seller_id = a.seller_id) AS seller_name,
      (SELECT p.product_name FROM products p WHERE p.product_id = b.product_id) AS product_name
        FROM 
            order_data a 
        JOIN 
            order_detail b 
        ON 
            a.order_id = b.order_id 
        WHERE   a.order_id=?
        
          `;
      let [rows] = await db.query(data, order_id);
      console.log(rows)


      result.data = rows;
      result.success = true;

      res.send(result);
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).send({ success: false, message: "Internal server error" });
    }
  }
  export const insertProduct = async (req, res) => {  
 
    let result = { success: false, data: [] };
    console.log(req.body)
    const [qr_id] =await max();
    async function max() {
      const max_id = `SELECT max(qrcode_id)as max FROM qrcode_record WHERE 1`;
      const [MaxidResult] = await db.query(max_id);
      return MaxidResult ;
    }
    try {
      const data2 = `INSERT INTO qrcode_record ( order_id, custom_id) VALUES (?, ?)`;
      const [insertResult] = await db.query(data2, [req.body[0].order_id, req.body[0].custom_id]);

      await Promise.all(req.body.map(async (v, i) => { 

          const data4 = `UPDATE order_detail    SET remain_count = ? WHERE order_id = ? and product_id=?;`;
          const countData = +v.remain_count - (+v.isvalue)
          const insertResult2 = await db.query(data4, [countData, v.order_id, v.product_id]);

          if (insertResult2) {
            const dataI = `INSERT INTO qrcode_detail_record (qrcode_id, product_id,count) VALUES (?, ?,?)`;
            console.log(qr_id,v.product_id,v.isvalue);
            const [insertResult] = await db.query(dataI,[qr_id.max,v.product_id,v.isvalue]);
        }
        else {
          return result;
        }  
      }))  
      result.data=[{qrcode_id:qr_id.max}];
      result.success = true;
      res.send(result);
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).send({ success: false, message: "Internal server error" });
    }
  }
 
