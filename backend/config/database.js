
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 4000),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Bật kết nối bảo mật cho TiDB Cloud
    ssl: {
        minVersion: 'TLSv1.2'
    }
});

db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối TiDB Cloud:', err.message);
        return;
    }

    console.log('Đã kết nối TiDB Cloud thành công!');
});

module.exports = db;
