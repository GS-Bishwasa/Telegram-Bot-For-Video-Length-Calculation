import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = {
  get(method, params) {
    return axios.get(`${process.env.BASE_URL}${process.env.MY_TOKEN}/${method}`, {
      params
    });
  },

  post(method, data) {
    return axios.post(
      `${process.env.BASE_URL}${process.env.MY_TOKEN}/${method}`,
      data
    );
  }
};

export default axiosInstance;
