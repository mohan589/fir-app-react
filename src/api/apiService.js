import axiosInstance from './axiosInstance';

const apiService = {
  get: (url, params = {}) => axiosInstance.get(url, { params }),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default apiService;
