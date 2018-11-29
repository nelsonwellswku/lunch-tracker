import createFetch from './fetchFactory';

const post = (url, data, name, context) => {
  const fetch = createFetch(name, context);
  return fetch.post(url, data);
};

export default post;
