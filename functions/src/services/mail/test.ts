// import * as dotenv from "dotenv";
// import { google } from "googleapis";
// import * as cheerio from "cheerio";
// import AsyncRequest from "../../helpers/async-request";

// const simpleParser = require("mailparser").simpleParser;
// const ARTICLE_LABEL = "Label_5993074366777440256";
// const getHrefs = require("get-hrefs");
// const request = new AsyncRequest();

// dotenv.config();

// const { client_id, client_secret, redirect_uris } = JSON.parse(process.env
//   .SERVICE_ACCOUNT as string).installed;

// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// (async () => {
//   try {
//     const oAuthClient = new google.auth.OAuth2({
//       clientId: client_id,
//       clientSecret: client_secret,
//       redirectUri: redirect_uris[0]
//     });

//     oAuthClient.setCredentials({
//       refresh_token: REFRESH_TOKEN
//     });

//     const gmail = google.gmail("v1");

//     const data = (await gmail.users.messages.list({
//       auth: oAuthClient,
//       userId: "km.corporatienl@gmail.com",
//       labelIds: [ARTICLE_LABEL],
//       maxResults: 330
//     })).data;

//     if (!data.messages) throw Error("NO MESSAGES FROM API CALL");

//     const promises = [];

//     for (const { id } of data.messages) {
//       promises.push(
//         new Promise(async (resolve, reject) => {
//           try {
//             const message = (await gmail.users.messages.get({
//               id: id,
//               userId: "km.corporatienl@gmail.com",
//               auth: oAuthClient,
//               format: "raw"
//             })).data;

//             if (!message.raw) return resolve();

//             if (!message.labelIds) return resolve();

//             const buffer = Buffer.from(message.raw, "base64");

//             const plainEmail = buffer.toString("utf8");
//             return resolve(plainEmail);
//           } catch (error) {
//             return reject(error);
//           }
//         })
//       );
//     }
//     const plainEmails = await Promise.all(promises);

//     for (const plainEmail of plainEmails) {
//       const parsed = await simpleParser(plainEmail);
//       const hrefs = getHrefs(parsed.textAsHtml);

//       const articleRef = hrefs.filter((href: string) => {
//         if (!href) return false;
//         return href.includes("http://mailchi.mp/corporatienl/nieuwsbrief");
//       })[0];

//       console.log(articleRef);
//       if (!articleRef) continue;

//       const articleHTML = await request.get(articleRef);
//       const $ = cheerio.load(articleHTML);
//       const titles = $("p[class=h1]");

//       const titleStrings: string[] = [];
//       titles.map((_: number, title: any) => {
//         const children = title.children;
//         if (!children) return;
//         const child = title.children[0];
//         if (!child) return;
//         const link = child.data;
//         if (!link) return;
//         titleStrings.push(link);
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })();
