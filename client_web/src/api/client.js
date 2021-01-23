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

async function fetchWrapper(method, endpoint, { body, ...customConfig } = {}) {
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
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data || defaults.error);
      }
    });
}

export const client = {
  get: (...args) => fetchWrapper("GET", ...args),
  post: (...args) => fetchWrapper("POST", ...args),
  put: (...args) => fetchWrapper("PUT", ...args),
  patch: (...args) => fetchWrapper("PATCH", ...args),
  delete: (...args) => fetchWrapper("DELETE", ...args),
};
