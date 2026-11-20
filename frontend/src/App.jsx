
import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'https://movie-management-api-35to.onrender.com/api/phim';
const formMacDinh = {
    ten_phim: '',
    the_loai: '',
    thoi_luong: '',
    ngay_khoi_chieu: '',
    mo_ta: '',
    hinh_anh: ''
};

function App() {
    const [danhSachPhim, setDanhSachPhim] = useState([]);
    const [form, setForm] = useState(formMacDinh);
    const [tuKhoa, setTuKhoa] = useState('');
    const [hienForm, setHienForm] = useState(false);
    const [dangSua, setDangSua] = useState(false);
    const [maPhimSua, setMaPhimSua] = useState(null);
    const [loading, setLoading] = useState(false);

    // Lấy danh sách phim
    const layDanhSachPhim = async () => {
        try {
            setLoading(true);

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Không thể tải danh sách phim');
            }

            const data = await response.json();

            setDanhSachPhim(
                Array.isArray(data)
                    ? data
                    : data.data || data.phim || []
            );

        } catch (error) {
            console.error(error);
            alert('Không thể kết nối đến máy chủ!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        layDanhSachPhim();
    }, []);

    // Nhập dữ liệu
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Mở form thêm
    const themPhim = () => {
        setForm(formMacDinh);
        setDangSua(false);
        setMaPhimSua(null);
        setHienForm(true);
    };

    // Mở form sửa
    const suaPhim = (phim) => {
        setForm({
            ten_phim: phim.ten_phim || '',
            the_loai: phim.the_loai || '',
            thoi_luong: phim.thoi_luong || '',
            ngay_khoi_chieu: phim.ngay_khoi_chieu
                ? String(phim.ngay_khoi_chieu).slice(0, 10)
                : '',
            mo_ta: phim.mo_ta || '',
            hinh_anh: phim.hinh_anh || ''
        });

        setMaPhimSua(phim.ma_phim);
        setDangSua(true);
        setHienForm(true);
    };

    // Thêm hoặc cập nhật phim
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = dangSua
                ? `${API_URL}/${maPhimSua}`
                : API_URL;

            const response = await fetch(url, {
                method: dangSua ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    thoi_luong: Number(form.thoi_luong)
                })
            });

            if (!response.ok) {
                const result = await response.json().catch(() => ({}));
                throw new Error(result.message || 'Không thể lưu phim');
            }

            alert(dangSua
                ? 'Cập nhật phim thành công!'
                : 'Thêm phim thành công!');

            setHienForm(false);
            setForm(formMacDinh);
            await layDanhSachPhim();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Xóa phim
    const xoaPhim = async (maPhim) => {
        const xacNhan = window.confirm(
            'Bạn có chắc chắn muốn xóa phim này không?'
        );

        if (!xacNhan) return;

        try {
            const response = await fetch(`${API_URL}/${maPhim}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Không thể xóa phim');
            }

            alert('Xóa phim thành công!');
            await layDanhSachPhim();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Tìm kiếm
    const phimDuocLoc = danhSachPhim.filter(phim =>
        (phim.ten_phim || '')
            .toLowerCase()
            .includes(tuKhoa.toLowerCase())
    );

    return (
        <div className="app">

            {/* Thanh tiêu đề */}
            <header className="header">
                <h2>🎬 MINI MOVIE MANAGEMENT</h2>
                <span>Quản lý phim</span>
            </header>

            <main className="container">

                {/* Tiêu đề trang */}
                <div className="page-title">
                    <div>
                        <h1>Danh sách phim</h1>
                        <p>Quản lý thông tin phim trong hệ thống</p>
                    </div>

                    <button className="btn-add" onClick={themPhim}>
                        + Thêm phim
                    </button>
                </div>

                {/* Tìm kiếm */}
                <div className="search-area">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tên phim..."
                        value={tuKhoa}
                        onChange={(e) => setTuKhoa(e.target.value)}
                    />

                    <span>
                        Tổng số phim: <strong>{danhSachPhim.length}</strong>
                    </span>
                </div>

                {/* Bảng danh sách */}
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Mã phim</th>
                                <th>Hình ảnh</th>
                                <th>Tên phim</th>
                                <th>Thể loại</th>
                                <th>Thời lượng</th>
                                <th>Ngày khởi chiếu</th>
                                <th>Mô tả</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="empty">
                                        Đang tải dữ liệu...
                                    </td>
                                </tr>
                            ) : phimDuocLoc.length > 0 ? (
                                phimDuocLoc.map(phim => (
                                    <tr key={phim.ma_phim}>
                                        <td>{phim.ma_phim}</td>

                                        <td>
                                            {phim.hinh_anh ? (
                                                <img
                                                    src={phim.hinh_anh}
                                                    alt={phim.ten_phim}
                                                    className="movie-image"
                                                />
                                            ) : (
                                                <span>Chưa có ảnh</span>
                                            )}
                                        </td>

                                        <td className="movie-name">
                                            {phim.ten_phim}
                                        </td>

                                        <td>{phim.the_loai}</td>

                                        <td>{phim.thoi_luong} phút</td>

                                        <td>
                                            {phim.ngay_khoi_chieu
                                                ? String(phim.ngay_khoi_chieu).slice(0, 10)
                                                : ''}
                                        </td>

                                        <td>{phim.mo_ta}</td>

                                        <td>
                                            <div className="action-buttons">
                                                   {/* <button
                                                        className="btn-edit"
                                                        onClick={() => suaPhim(phim)}
                                                    >
                                                        Sửa
                                                    </button> */}

                                                <button
                                                    className="btn-delete"
                                                    onClick={() => xoaPhim(phim.ma_phim)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="empty">
                                        Không tìm thấy phim nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Form thêm và sửa */}
                {hienForm && (
                    <div className="modal">
                        <div className="modal-content">

                            <h2>
                                {dangSua ? 'Cập nhật phim' : 'Thêm phim mới'}
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <label>Tên phim</label>
                                <input
                                    name="ten_phim"
                                    value={form.ten_phim}
                                    onChange={handleChange}
                                    required
                                />

                                <label>Thể loại</label>
                                <input
                                    name="the_loai"
                                    value={form.the_loai}
                                    onChange={handleChange}
                                    required
                                />

                                <label>Thời lượng (phút)</label>
                                <input
                                    type="number"
                                    name="thoi_luong"
                                    min="1"
                                    value={form.thoi_luong}
                                    onChange={handleChange}
                                    required
                                />

                                <label>Ngày khởi chiếu</label>
                                <input
                                    type="date"
                                    name="ngay_khoi_chieu"
                                    value={form.ngay_khoi_chieu}
                                    onChange={handleChange}
                                    required
                                />

                                <label>Mô tả</label>
                                <textarea
                                    name="mo_ta"
                                    value={form.mo_ta}
                                    onChange={handleChange}
                                />

                                <label>Đường dẫn hình ảnh</label>
                                <input
                                    name="hinh_anh"
                                    value={form.hinh_anh}
                                    onChange={handleChange}
                                    placeholder="Nhập URL hình ảnh"
                                />

                                <div className="form-actions">
                                    <button type="submit" className="btn-save">
                                        {dangSua ? 'Lưu thay đổi' : 'Thêm phim'}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={() => setHienForm(false)}
                                    >
                                        Hủy
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default App;
