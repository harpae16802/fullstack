import db from "../utils/db.js";
import fs from 'fs';
import path from 'path';

 
    export const favoriteDel01Product = async(req, res)=> {
         // favorite_product
        const values=req.body.favorite_id
        const sql=`DELETE FROM favorite_product WHERE favorite_id=?`
        
        await db.query(sql, values)
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
     
    export const favoriteSearch01Product = async(req, res)=> { 
          // favorite_product 
        const values=req.body.favorite_id ||1
        const sql=`select created_at,favorite_id ,(select product_name from products WHERE product_id=favorite_product.product_id )product_name,(select custom_name from custom where custom_id=favorite_product.custom_id)custom_name FROM favorite_product WHERE custom_id=?`
        
        await db.query(sql, values)
        .then((res2) => {   
            if (!res2) {
                return res.json({ error: "Error in signup query" });
            } else {
                return res.send({ status: "Success",data:res2[0] });
            } 
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
    }
    export const favoriteDel02Store = async(req, res)=> {  
     
        // store
        const values=req.body.favorite_id
        
        const sql=`DELETE FROM favorite_store WHERE favorite_id=?`
        
        await db.query(sql, values)
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
    export const favoriteSearch02Store = async(req, res)=> {   
         // store
        const values=req.body.custom_id||1
        const sql=`select created_at, favorite_id ,(select store_name from seller WHERE seller_id=favorite_store.seller_id )seller_id,(select custom_name from custom where custom_id=favorite_store.custom_id)custom_name FROM favorite_store WHERE custom_id=?`
        
        await db.query(sql, values)
        .then((res2) => {   
            if (!res2) {
                return res.json({ error: "Error in signup query" });
            } else {
                return res.send({ success:true,data:res2[0] });
            } 
        })
        .catch((err) => {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing the request" });
        });
    }
 