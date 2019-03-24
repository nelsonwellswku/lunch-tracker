import { IJwtPayload } from "../AppContext";

const decodeJwt = (token: string): IJwtPayload | null => {
  var payload = token.split('.')[1];
  if (!payload) {
    return null;
  }
  var decoded = atob(payload);
  return JSON.parse(decoded);
}

export default decodeJwt;
