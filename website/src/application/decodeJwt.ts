const decodeJwt = (token: string) => {
  if (!token) {
    return '';
  }
  const middleSection = token.split('.')[1];
  const payload = atob(middleSection);
  return JSON.parse(payload);
};

export default decodeJwt;
