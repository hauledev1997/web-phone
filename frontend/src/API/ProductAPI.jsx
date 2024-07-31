import axiosClient from './axiosClient';

const ProductAPI = {
  getAPI: () => {
    // const url = 'https://haule2.onrender.com/products';
    const url = 'http://localhost:5000/products';

    return axiosClient.get(url);
  },

  getCategory: query => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: id => {
    // const url = `https://haule2.onrender.com/products/${id}`;
    const url = `http://localhost:5000/products/${id}`;
    return axiosClient.get(url);
  },

  getPagination: query => {
    // const url = `https://haule2.onrender.com/products/pagination${query}`;
    const url = `http://localhost:5000/products/pagination${query}`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;
