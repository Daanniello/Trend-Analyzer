import * as axios from "axios";
axios.defaults.baseURL =
  "https://us-central1-trend-analyzer-5f614.cloudfunctions.net/api";

class RequestService {
  async get(uri) {
    return await axios.get(uri);
  }

  async post(uri, body) {
    return await axios.post(uri, body);
  }
}

export default RequestService;
