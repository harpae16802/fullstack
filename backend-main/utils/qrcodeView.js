const db = require('./mysql2-connect');  

async function createAndViewData() {
    try { 
        const createViewSql = `
        CREATE OR REPLACE VIEW qrcodeView AS
        SELECT  
        qdr.status,
          qr.qrcode_id,
            od.order_id, 
            c.custom_account, 
            c.custom_id,
            s.seller_id, 
            od.total_sum,
            od.payment_date,
            odt.order_detail_id,
            odt.product_id,
            odt.purchase_quantity,
            c.custom_name,
            p.product_name,
            s.store_name  
        FROM 
            order_data od
        JOIN 
            order_detail odt ON od.order_id = odt.order_id
        JOIN 
            custom c ON od.custom_id = c.custom_id
        JOIN
            products p ON odt.product_id = p.product_id 
        JOIN
              seller s ON s.seller_id = p.seller_id
        JOIN 
        qrcode_record qr on odt.order_id=qr.order_id
        JOIN
        qrcode_detail_record  qdr on qr.qrcode_id=qdr.qrcode_id
        `;
        await db.query(createViewSql);
        console.log('View ensured (created or already existing)');

       
        const queryViewSql = `SELECT * FROM qrcodeView;`;
        const [results] = await db.query(queryViewSql);
        if (results.length > 0) {
            console.log('Data from qrcodeView:', results);
        } else {
            console.log('View exists but no data found or view is empty');
        }
    } catch (error) {
        if (error.code === 'ER_NO_SUCH_TABLE') {
            console.error('View does not exist and cannot be created:', error);
        } else {
            console.error('Database operation failed:', error);
        }
    } finally {
       
    }
}

module.exports = { createAndViewData };
