export default class ClientBase {
  transformOptions(options: RequestInit): Promise<RequestInit> {
    return Promise.resolve(options);
  }

  transformResult(url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any> {
    return processor(response);
  }
}
