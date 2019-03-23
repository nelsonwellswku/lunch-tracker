export default class ClientBase {
  async transformOptions(requestInit: RequestInit): Promise<RequestInit> {
    return requestInit;
  }

  async transformResult(url: string, response: Response, processor: (response: Response) => any) {
    return processor(response);
  }
}
