import * as functions from "firebase-functions";
import * as express from "express";

/* Express */
const app = express();
app.use("", require("./routes"));

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

export const api = functions.https.onRequest(app);
