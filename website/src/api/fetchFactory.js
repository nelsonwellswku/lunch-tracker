import axios from 'axios';

export const createFetcher = ({
  onUnauthorized = () => undefined,
  onPrefetch = () => undefined,
  onPostfetch = () => undefined,
} = {}) => {
  const fetch = axios.create();

  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  fetch.interceptors.request.use((config) => {
    onPrefetch();
    return config;
  }, error => Promise.reject(error));

  fetch.interceptors.response.use((response) => {
    onPostfetch();
    return response;
  }, (error) => {
    if (error.response.status === 401) {
      onUnauthorized();
    }
    onPostfetch();
    return Promise.reject(error);
  });

  return fetch;
};

export default createFetcher;
