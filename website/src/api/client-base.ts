export default class ClientBase {

  constructor(public authorizationToken?: string) {
  }

  transformOptions(options: RequestInit): Promise<RequestInit> {
    return Promise.resolve(options);
  }

  transformResult(url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any> {
    return processor(response);
  }
}
