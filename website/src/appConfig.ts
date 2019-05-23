
interface IAppConfig {
  BaseUrl: string,
  GoogleClientId: string
};

const validate = (appConfig: IAppConfig): IAppConfig => {
  if (!appConfig.BaseUrl || !appConfig.GoogleClientId) {
    throw new Error("App configuration is invalid.");
  }
  return appConfig;
}

const appConfig = {
  BaseUrl: process.env.REACT_APP_BASE_URL || '',
  GoogleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
}

export default validate(appConfig);
