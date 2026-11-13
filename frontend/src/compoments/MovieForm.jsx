
import { useEffect, useState } from 'react';

const emptyMovie = {
    ten_phim: '',
    the_loai: '',
    thoi_luong: '',
    ngay_khoi_chieu: '',
    mo_ta: '',
    hinh_anh: ''
};

function MovieForm({ movie, onSave, onCancel }) {
    const [form, setForm] = useState(emptyMovie);

    useEffect(() => {
        if (movie) {
            setForm({
                ten_phim: movie.ten_phim || '',
                the_loai: movie.the_loai || '',
                thoi_luong: movie.thoi_luong || '',
                ngay_khoi_chieu: movie.ngay_khoi_chieu
                    ? String(movie.ngay_khoi_chieu).slice(0, 10)
                    : '',
                mo_ta: movie.mo_ta || '',
                hinh_anh: movie.hinh_anh || ''
            });
        } else {
            setForm(emptyMovie);
        }
    }, [movie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.ten_phim.trim() || !form.the_loai.trim()) {
            alert('Vui lòng nhập tên phim và thể loại!');
            return;
        }

        if (!Number.isInteger(Number(form.thoi_luong)) ||
            Number(form.thoi_luong) <= 0) {
            alert('Thời lượng phải là số nguyên dương!');
            return;
        }

        onSave({
            ...form,
            thoi_luong: Number(form.thoi_luong),
            ngay_khoi_chieu: form.ngay_khoi_chieu || null
        });
    };

    return (
        <div className="form-container">
            <h2>{movie ? 'Cập nhật phim' : 'Thêm phim mới'}</h2>

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
                    value={form.thoi_luong}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <label>Ngày khởi chiếu</label>
                <input
                    type="date"
                    name="ngay_khoi_chieu"
                    value={form.ngay_khoi_chieu}
                    onChange={handleChange}
                />

                <label>Mô tả</label>
                <textarea
                    name="mo_ta"
                    value={form.mo_ta}
                    onChange={handleChange}
                />

                <label>Link hình ảnh</label>
                <input
                    name="hinh_anh"
                    value={form.hinh_anh}
                    onChange={handleChange}
                    placeholder="https://..."
                />

                <div className="form-buttons">
                    <button type="submit">
                        {movie ? 'Lưu thay đổi' : 'Thêm phim'}
                    </button>

                    <button type="button" onClick={onCancel}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MovieForm;
