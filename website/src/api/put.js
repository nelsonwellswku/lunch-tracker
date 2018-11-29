import createFetch from './fetchFactory';

const put = (url, data, name, context) => {
  const fetch = createFetch(name, context);
  return fetch.put(url, data);
};

export default put;
