const translate = require("@k3rn31p4nic/google-translate-api");

const MAX_TRANSLATE_SIZE = 1300;

class Translator {
  constructor() {}

  async translate(text: any) {
    const dutch_arr = this.divideText(text);
    var eng_txt = "";
    if (dutch_arr != undefined && dutch_arr.length != 0) {
      // array empty or does not exist
      for (var i = 0; i < dutch_arr.length; i++) {
        await translate(dutch_arr[i], { to: "en" })
          .then((res: any) => {
            //console.log(res.text); // Translated text
            eng_txt = eng_txt + res.text;
          })
          .catch((err: any) => {
            console.log("errormsg: ");
            console.error(err);
          });
      }
    }
    return eng_txt;
  }

  divideText(text: string): string[] {
    var dutch_text_parts = [];

    while (text.length > 1) {
      // Get a raw text part of 1300 chars
      var substr_raw = "";
      var last_str_index;
      if (text.length >= MAX_TRANSLATE_SIZE) {
        substr_raw = text.substr(0, MAX_TRANSLATE_SIZE);

        // Get the index of the last whitespace occurence
        last_str_index = substr_raw.lastIndexOf(" ");

        // Remove the text part from the original text
        text = text.replace(text.substr(0, last_str_index), "");
      } else {
        substr_raw = text.substr(0, text.length - 1);
        last_str_index = text.length;

        // Remove the text part from the original text
        text = text.replace(text.substr(0, last_str_index - 1), "");
      }

      // Get a new substring that ends with a whitespace to benefit translation
      const text_part = substr_raw.substr(0, last_str_index);

      // Add the text_part to the text_parts
      dutch_text_parts.push(text_part);
    }
    return dutch_text_parts;
  }
}
export default Translator;
