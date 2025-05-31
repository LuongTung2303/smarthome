import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/feeds';

export const toggleLight = async (deviceName, state) => {
  try {
    const value = state ? "1" : "0";
    const token = localStorage.getItem('token');

    const response = await axios.post(`${API_BASE_URL}/${deviceName}`, {
      value: value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu bật/tắt đèn:", error.response?.data || error.message);
    throw error;
  }
    //  const token = localStorage.getItem('token');
    // console.log(token);
};


export const setTemp = async (value) => {
  const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:5000/feeds/air_cond`, {
        value: String(value),
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi gửi nhiệt độ:", error);
      throw error;
    }
  };
