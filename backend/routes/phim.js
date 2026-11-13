
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// READ: Lấy danh sách phim
router.get('/', (req, res) => {
    db.query('SELECT * FROM phim ORDER BY ma_phim DESC', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// CREATE: Thêm phim
router.post('/', (req, res) => {
    const {
        ten_phim, the_loai, thoi_luong,
        ngay_khoi_chieu, mo_ta, hinh_anh
    } = req.body;

    if (!ten_phim || !the_loai || !Number.isInteger(Number(thoi_luong)) || Number(thoi_luong) <= 0) {
        return res.status(400).json({ message: 'Thông tin phim không hợp lệ' });
    }

    const sql = `INSERT INTO phim
    (ten_phim, the_loai, thoi_luong, ngay_khoi_chieu, mo_ta, hinh_anh)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        ten_phim, the_loai, thoi_luong,
        ngay_khoi_chieu || null, mo_ta || null, hinh_anh || null
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
            message: 'Thêm phim thành công',
            ma_phim: result.insertId
        });
    });
});

// UPDATE: Sửa phim
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        ten_phim, the_loai, thoi_luong,
        ngay_khoi_chieu, mo_ta, hinh_anh
    } = req.body;

    if (!ten_phim || !the_loai || !Number.isInteger(Number(thoi_luong)) || Number(thoi_luong) <= 0) {
        return res.status(400).json({ message: 'Thông tin phim không hợp lệ' });
    }

    const sql = `UPDATE phim SET
        ten_phim = ?, the_loai = ?, thoi_luong = ?,
        ngay_khoi_chieu = ?, mo_ta = ?, hinh_anh = ?
        WHERE ma_phim = ?`;

    db.query(sql, [
        ten_phim, the_loai, thoi_luong,
        ngay_khoi_chieu || null, mo_ta || null, hinh_anh || null, id
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy phim' });
        }

        res.json({ message: 'Cập nhật phim thành công' });
    });
});

// DELETE: Xóa phim
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM phim WHERE ma_phim = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy phim' });
        }

        res.json({ message: 'Xóa phim thành công' });
    });
});

module.exports = router;
