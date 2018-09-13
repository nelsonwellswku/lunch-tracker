import axios from 'axios';

export const createFetcher = ({
  onUnauthorized = () => undefined,
} = {}) => {
  const fetch = axios.create();

  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  fetch.interceptors.response.use(response => response, (error) => {
    if (error.response.status === 401) {
      onUnauthorized();
    }
    Promise.reject(error);
  });

  return fetch;
};

export default createFetcher;
