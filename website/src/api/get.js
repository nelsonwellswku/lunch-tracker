import createFetch from './fetchFactory';

const get = (url, name, context) => {
  const fetch = createFetch(name, context);
  return fetch.get(url);
};

export default get;
