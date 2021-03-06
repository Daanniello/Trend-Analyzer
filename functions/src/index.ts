import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";

dotenv.config();
admin.initializeApp(functions.config().firebase);

/* Express */
const app = express();
app.use(cors());

/* Add (global) middleware */
app.use(require("./middleware/key-guard"));

/* Add routes */
app.use("", require("./routes"));

export const api = functions.https.onRequest(app);
