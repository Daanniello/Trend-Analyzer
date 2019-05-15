import * as Request from "request";

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
}

export default AsyncRequest;

// EXAMPLE
// (async () => {
//   const request = new AsyncRequest();
//   try {
//     const body = await request.get(
//       "https://www.corporatienl.nl/artikelen/samen-kan-je-sneller-goedkoper-en-meer-digitaliseren/"
//     );
//     console.log(body);
//   } catch (error) {
//     console.log(error);
//   }
// })();
