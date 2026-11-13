
function MovieList({ movies, onEdit, onDelete }) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Mã phim</th>
                        <th>Tên phim</th>
                        <th>Thể loại</th>
                        <th>Thời lượng</th>
                        <th>Ngày khởi chiếu</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {movies.length === 0 ? (
                        <tr>
                            <td colSpan="6">Chưa có phim nào</td>
                        </tr>
                    ) : (
                        movies.map((movie) => (
                            <tr key={movie.ma_phim}>
                                <td>{movie.ma_phim}</td>
                                <td>{movie.ten_phim}</td>
                                <td>{movie.the_loai}</td>
                                <td>{movie.thoi_luong} phút</td>
                                <td>
                                    {movie.ngay_khoi_chieu
                                        ? String(movie.ngay_khoi_chieu).slice(0, 10)
                                        : ''}
                                </td>
                                <td>
                                    <button onClick={() => onEdit(movie)}>
                                        Sửa
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(movie.ma_phim)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MovieList;
