import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/feeds';

export const toggleLight = async (deviceName, state) => {
  try {
    const value = state ? "1" : "0";
    const response = await axios.post(`${API_BASE_URL}/${deviceName}`, {
      value: value,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu bật/tắt đèn:", error);
    throw error;
  }
};

export const setTemp = async (value) => {
    try {
      const response = await axios.post(`http://localhost:5000/feeds/air_cond`, {
        value: String(value),
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi gửi nhiệt độ:", error);
      throw error;
    }
  };
