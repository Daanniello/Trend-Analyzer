import * as Request from "request";

/**
 * Helper class for making async web requests
 */
class AsyncRequest {
  async get(url: string, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        Request.get(
          url,
          (error: any, response: Request.Response, body: any) => {
            if (error) reject(error);
            resolve(body);
          }
        ).form(options);
      } catch (error) {
        reject(error);
      }
    });
  }

  async post(url: string, options?: any, headers?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        Request.post(
          url,
          { headers: options.headers },
          (error: any, response: Request.Response, body: any) => {
            if (error) reject(error);
            resolve(body);
          }
        ).form(options.body);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default AsyncRequest;
