import axiosClient from './axiosClient';

const headers = {
  authorization: 'Bearer ' + localStorage.getItem('token'),
};

const ChatRoomsAPI = {
  getMessageByRoomId: roomId => {
    const url = `https://tmdt.vercel.app/chatrooms/getById?roomId=${roomId}`;
    // const url = `http://localhost:5000/chatrooms/getById?roomId=${roomId}`;
    return axiosClient.get(url, { headers });
  },

  createNewRoom: () => {
    const url = `https://tmdt.vercel.app/chatrooms/createNewRoom`;
    return axiosClient.post(url, {}, { headers });
  },

  addMessage: body => {
    const url = `https://tmdt.vercel.app/chatrooms/addMessage`;
    axiosClient.put(url, body, { headers });
  },
};
export default ChatRoomsAPI;
