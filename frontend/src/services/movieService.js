
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/phim';

// Lấy danh sách phim
export const getMovies = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Thêm phim
export const addMovie = async (movie) => {
    const response = await axios.post(API_URL, movie);
    return response.data;
};

// Sửa phim
export const updateMovie = async (id, movie) => {
    const response = await axios.put(`${API_URL}/${id}`, movie);
    return response.data;
};

// Xóa phim
export const deleteMovie = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
