// multerConfig.js
//  調用multer 存圖片   
//  預先將圖片存入storage中做好 
//   然後把剛剛的storage存在變數當作middleware
// 使用 ESM 導入語法
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// 因為 ESM 中沒有 __dirname，我們需要創建它
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.join(__dirname, '../public/discuss'))
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 使用 ESM 導出語法
export default upload;
