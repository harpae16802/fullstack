// controllers/jsonTableController.js
import db from "../utils/db.js";

export const hellojsonTable = async (req, res) => {
    let page = req.query.page || 1;
    const perPage = 25;
    let keyword = req.query.keyword || "";
    let where = "where 1";
    let totalPages = 0;
    if (page < 1) {
        return res.redirect("?page=1");
    }

    if (keyword) {
        where = `where ${keyword}`;
    }
    
    const t_sql = `SELECT COUNT(1) totalRows FROM address_book ${where}`;
    const [[{ totalRows }]] = await db.query(t_sql);
    if (!totalRows) {
        return res.status(404).json({ success: false, message: "無資料" });
    } else {
        totalPages = Math.ceil(totalRows / perPage);
        if (totalPages < page) {
            const newQuery = { ...req.query, page: totalPages };
            const qs = new URLSearchParams(newQuery).toString();
            return res.redirect("?" + qs);
        }

        const data = `SELECT * FROM address_book ${where} ORDER BY sid DESC LIMIT ${(page - 1) * perPage}, ${perPage}`;
        const [rows] = await db.query(data);

        res.render("json-table/json-table", {
            success: true,
            totalRows,
            totalPages,
            page,
            perPage,
            rows,
            query: req.query,
        });
    }
};

export const jsonTableSearch = async (req, res) => {
    // 實現具體邏輯
};
