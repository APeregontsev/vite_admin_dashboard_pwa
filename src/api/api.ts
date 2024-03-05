// List of URLS
export const initialDataURL: Record<string, any> = {
  todos: { url: "todos/" },
  users: { url: "users/" },
  photos: { url: "photos/" },
  albums: { url: "albums/" },
  comments: { url: "comments/" },
  posts: { url: "posts/" },
};

export const resStatus = { addEntry: [201], editEntry: [200], deleteEntry: [200] };

// API calls wrapper

/* import axios from "axios";

let baseEndpoint = "";

const getBaseHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export const setBaseEndpoint = (ep) => {
  baseEndpoint = ep;
};

const callApi = async (url, { headers = {}, params = {}, data, ...restOptions }) => {
  const config = {
    url: `${baseEndpoint}${url}`,
    headers: { ...getBaseHeaders(), ...headers },
    params: { ...params },
    data,

    ...restOptions,
  };
  let hasError = false;

  if (restOptions.method === "POST" && !config.data) {
    config.data = {};
  }

  const request = async (conf) => {
    const responseData = await axios.request(config).catch(() => (hasError = true));

    if (responseData.status === 200) {
      hasError = false;
    }
    if (!hasError) {
      return responseData;
    }
    return request(conf);
  };

  const responseData = request();
  return responseData;
};

export default {
  get: (url, options) => callApi(url, { ...options, method: "GET" }),
  post: (url, options) => callApi(url, { ...options, method: "POST" }),
  put: (url, options) => callApi(url, { ...options, method: "PUT" }),
  delete: (url, options) => callApi(url, { ...options, method: "DELETE" }),
}; */
