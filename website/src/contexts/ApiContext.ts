import React from 'react';
import { UserClient, AuthClient, RestaurantClient } from '../api/generated';
import appConfig from '../appConfig';

export interface IApiContext {
  userClient: UserClient,
  authClient: AuthClient,
  restaurantClient: RestaurantClient,
}

const ApiContext = React.createContext<IApiContext>({
  userClient: new UserClient(appConfig.BaseUrl),
  authClient: new AuthClient(appConfig.BaseUrl),
  restaurantClient: new RestaurantClient(appConfig.BaseUrl),
});

export default ApiContext;
