import axios from "axios";

const defaults = {
  baseURL: process.env.API_URL || "/api",
  headers: { "Content-Type": "application/json" },
  status: 503,
  data: {},
  error: {
    code: "SERVER_ERROR",
    msg:
      "Something went wrong. Check your network connection and refresh this page. If the issue continues contact our support.",
  },
};

// TODO: working on
const api = async (method, url, variables) => {
  try {
    const response = await axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers,
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) return err.response.data.error;

    return defaults.error;
  }
};

export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
  put: (...args) => api("put", ...args),
  patch: (...args) => api("patch", ...args),
  delete: (...args) => api("delete", ...args),
};
