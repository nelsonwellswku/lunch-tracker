import axios from 'axios';

export const createFetcher = (name, {
  onUnauthorized = () => undefined,
  onPrefetch = () => undefined,
  onPostfetch = () => undefined,
} = {}) => {
  const fetch = axios.create();

  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    fetch.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  fetch.interceptors.request.use((config) => {
    onPrefetch(name);
    return config;
  }, error => Promise.reject(error));

  fetch.interceptors.response.use((response) => {
    onPostfetch(name);
    return response;
  }, (error) => {
    if (error.response.status === 401) {
      onUnauthorized();
    }
    onPostfetch(name);
    return Promise.reject(error);
  });

  return fetch;
};

export default createFetcher;
