export default class ClientBase {

  constructor(public authorizationToken?: string) {
  }

  transformOptions(options: RequestInit): Promise<RequestInit> {
    if (this.authorizationToken) {
      options.headers = new Headers({
        ...options.headers,
        'authorization': 'Bearer ' + this.authorizationToken,
      });
    }

    return Promise.resolve(options);
  }

  transformResult(url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any> {
    return processor(response);
  }
}
