import axios from "axios";

const Api = axios.create({
  baseURL: `/api`,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export default Api;
