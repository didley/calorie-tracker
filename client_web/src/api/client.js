import axios from "axios";

const defaults = {
  baseURL: "/api",
  headers: { "content-type": "application/json" },
  error: {
    code: "SERVER_ERROR",
    msg:
      "Something went wrong. Check your network connection and refresh this page. If the issue continues contact our support.",
    status: 503,
    data: {},
  },
};

async function apiClient(method, endpoint, { body, ...customConfig } = {}) {
  const config = {
    method,
    ...customConfig,
    headers: {
      ...defaults.headers,
      ...customConfig.headers,
    },
  };
  if (body) config.body = JSON.stringify(body);

  return window
    .fetch(`${defaults.baseURL}${endpoint}`, config)
    .then(async (res) => {
      // if (res.status === 401) {
      //   logout();
      //   window.location.assign('/login');
      //   return Promise.reject({ message: 'Please re-authenticate' });
      // }
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return Promise.reject(res);
      }
    });

  // try {
  //   const response = await axios({
  //     url: `${defaults.baseURL}${endpoint}`,
  //     method,
  //     headers: defaults.headers,
  //     params: method === "get" ? variables : undefined,
  //     data: method !== "get" ? variables : undefined,
  //   });
  //   const data = await response.json();
  //   console.log({ data });
  //   return data;
  // } catch (err) {
  //   console.log(err);
  //   if (err.response) return err.response.data.error;

  //   return defaults.error;
  // }
}

export const client = {
  get: (...args) => apiClient("GET", ...args),
  post: (...args) => apiClient("POST", ...args),
  put: (...args) => apiClient("PUT", ...args),
  patch: (...args) => apiClient("PATCH", ...args),
  delete: (...args) => apiClient("DELETE", ...args),
};
