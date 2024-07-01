import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { userAgentFromString } from "next/server";

// Create an instance of axios
const axiosInstance = axios.create();

// Create a Mock Adapter instance
const mock = new MockAdapter(axiosInstance);
let users = [];

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/users").reply((config) => {
  return [
    200,
    {
      user: [{ id: 1, firstName: "ozkan" }],
    },
  ];
});

// Set up interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
