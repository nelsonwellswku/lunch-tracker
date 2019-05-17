export default class ClientBase {

  constructor(public authorizationToken?: string) {
  }

  transformOptions(options: RequestInit): Promise<RequestInit> {
    // TODO: Get rid of this function,
    // it's a leftover from using bearer tokens
    return Promise.resolve(options);
  }

  transformResult(url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any> {
    if (response.status === 401) {
      window.location.href = 'sign-out';
    }
    return processor(response);
  }
}
