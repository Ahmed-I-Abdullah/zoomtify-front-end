import axios from "axios";

const clientInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  headers: {
    Authorization: localStorage.getItem("access")
      ? "JWT " + localStorage.getItem("access")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

clientInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const failedRequest = error.config;

	if (
		error.response.status === 401 &&
		failedRequest.url === '/token/refresh/'
	) {
		//window.location.href = '/login';
		return Promise.reject(error);
	}

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh");

      return clientInstance
        .post("/token/refresh/", { refresh: refreshToken })
        .then((resp) => {
          console.log("data at interceptor is: ", resp);
          localStorage.setItem("access", resp.data.access);
          if(resp.refresh) {
            localStorage.setItem("refresh", resp.data.refresh);
          }

          clientInstance.defaults.headers["Authorization"] =
            "JWT " + resp.data.access;
          failedRequest.headers["Authorization"] = "JWT " + resp.data.access;

          return clientInstance(failedRequest);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default clientInstance;
