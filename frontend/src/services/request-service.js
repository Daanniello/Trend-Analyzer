import * as axios from "axios";
axios.defaults.baseURL =
  // "http://localhost:5000/trend-analyzer-5f614/us-central1/api";
  "https://us-central1-trend-analyzer-5f614.cloudfunctions.net/api";

class RequestService {
  async get(uri) {
    return await axios.get(uri);
  }

  async post(uri, body) {
    return await axios.post(uri, body);
  }

  async delete(uri, body) {
    return await axios.delete(uri, { data: body });
  }
}

export default RequestService;
