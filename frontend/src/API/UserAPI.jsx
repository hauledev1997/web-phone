import axiosClient from './axiosClient';

const UserAPI = {
  getDetailData: id => {
    // const url = `https://haule2.onrender.com/name/${id}`;
    const url = `http://localhost:5000/name/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: query => {
    // const url = `https://haule2.onrender.com/signup/${query}`;
    const url = `http://localhost:5000/signup/${query}`;

    return axiosClient.post(url);
  },

  postLogin: data => {
    // const url = `https://haule2.onrender.com/users`;
    const url = `http://localhost:5000/users`;

    return axiosClient.post(url, data);
  },
};

export default UserAPI;
