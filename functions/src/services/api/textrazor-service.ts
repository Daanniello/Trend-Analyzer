import fetch from "node-fetch";

class TextRazorService {
  //Use to send POST request to text razor API
  postTextRazor() {
    try {
      // TODO: will with real parameter data instead of dummy data
      var params: any = {
        text:
          "Spain's stricken Bankia expects to sell off its vast portfolio of industrial holdings that includes a stake in the parent company of British Airways and Iberia.",
        extractors: "topics",
        language: "dut",
        classifiers: "textrazor_mediatopics"
      };

      // Create a formbody so the request body can be filled and
      // will work with the content-type: application/x-www-form-urlencoded

      var formBody: any = [];
      for (var property in params) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join("&");

      // Fetch from URL endpoint
      fetch("http://api.textrazor.com/", {
        method: "POST",
        headers: {
          "x-textrazor-key":
            "52160e4b73992b0447931c3457c8f6ee8aa0d3c8465d5c1f1d597138",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "PostmanRuntime/7.13.0",
          Accept: "*/*",
          "Cache-Control": "no-cache",
          "Postman-Token":
            "b1841ee5-5e22-4de6-8db4-ddbad4cedf5c,2d45f710-e40c-46fe-b823-3a2a10d17248",
          Host: "api.textrazor.com",
          "accept-encoding": "gzip, deflate",
          "content-length": "255",
          Connection: "keep-alive",
          "cache-control": "no-cache"
        },
        body: formBody
      })
        .then(response => response.json())
        .then(json => this.filterJSON(json))
        .catch(error => console.error(error));
    } catch (e) {
      console.log("Errormessage: " + e);
    }
  }

  // filter the categories and topics from the JSON object
  filterJSON(json: JSON) {
    /*Category section */
    const jsonCategories = JSON.parse(JSON.stringify(json))["response"][
      "categories"
    ];

    const categories = [];

    for (var i = 0; i < jsonCategories.length; i++) {
      var cat = jsonCategories[i];
      if (cat.score > 0.4) {
        const splitCat = cat.label.split(">")[0];
        categories.push(splitCat);
      }
    }
    let uniqueCategories = new Set(categories);

    console.log(uniqueCategories);

    /*Topic section */
    const jsonTopics = JSON.parse(JSON.stringify(json))["response"]["topics"];

    const topics = [];

    for (var i = 0; i < jsonTopics.length; i++) {
      var top = jsonTopics[i];
      if (top.score > 0.5) {
        topics.push(top.label);
      }
    }
    let uniqueTopics = new Set(topics);

    console.log("-- topics --");
    console.log(uniqueTopics);
  }

  // get request setup
  getTest(url: any) {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data); // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error));
    } catch (e) {
      console.log("Errormessage: " + e);
    }
  }
}

export default TextRazorService;
