import * as dotenv from "dotenv";
import { google } from "googleapis";
import * as cheerio from "cheerio";
import AsyncRequest from "../../helpers/async-request";
import ArticleService from "../database/article-service";

const simpleParser = require("mailparser").simpleParser;
const ARTICLE_LABEL = "Label_5993074366777440256";
const CORPORATION_NL_BASEURL = "www.corporatienl.nl/artikelen/";
const getHrefs = require("get-hrefs");
const request = new AsyncRequest();
const gmail = google.gmail("v1");
const articleService = new ArticleService();
let mailSubjects: string[] = [];

dotenv.config();

const { client_id, client_secret, redirect_uris } = JSON.parse(process.env
  .SERVICE_ACCOUNT as string).installed;

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuthClient = new google.auth.OAuth2({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uris[0]
});

oAuthClient.setCredentials({
  refresh_token: REFRESH_TOKEN
});

class EmailAnalyzer {
  EmailAnayzer() {}

  async GetContent() {
    console.log("Enpoint approached!");
    await this.analyzeEmails();
  }
  async analyzeEmails(): Promise<any> {
    try {
      // Get the emails and store them in a list
      const data = (await gmail.users.messages.list({
        auth: oAuthClient,
        userId: "km.corporatienl@gmail.com",
        labelIds: [ARTICLE_LABEL],
        maxResults: 30
      })).data;

      if (!data.messages) throw Error("NO MESSAGES FROM API CALL");

      // Get the plain emails
      const plainEmails = await this.getPlainEmails(data);

      // Get the titles from the emails
      let titleStrings: string[] = [];
      return new Promise(async (resolve, reject) => {
        try {
          titleStrings = await this.getTitles(plainEmails);
          resolve(titleStrings);
        } catch (error) {
          console.log(error);
          reject(titleStrings);
        }
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getTitles(plainEmails: any) {
    try {
      for (const plainEmail of plainEmails) {
        const parsed = await simpleParser(plainEmail);
        const hrefs = getHrefs(parsed.textAsHtml);

        // If there are duplicate emails they shouldnt be analyzed twice
        if (mailSubjects.indexOf(parsed.subject) > -1) continue;

        mailSubjects.push(parsed.subject);

        const articleRef = hrefs.filter((href: string) => {
          if (!href) return false;
          return href.includes("http://mailchi.mp/corporatienl/nieuwsbrief");
        })[0];

        //console.log(articleRef);
        if (!articleRef) continue;

        const articleHTML = await request.get(articleRef);
        const $ = cheerio.load(articleHTML);
        //const titles = $("p[class=h1]");

        // Get all hyperlinks from article
        const links = $("a");
        const stringLinks: string[] = [];
        $(links).each(async (i, link) => {
          if (
            $(link)
              .attr("href")
              .includes(CORPORATION_NL_BASEURL)
          ) {
            stringLinks.push($(link).attr("href"));
          }
        });

        for (const link of stringLinks.filter(this.onlyUnique)) {
          await articleService.incrementMailOccurence(link, articleRef);
        }
      }
      return plainEmails;
    } catch (error) {
      console.log("Done analyzing!");
      return plainEmails;
    }
  }

  async getPlainEmails(data: any) {
    const promises = [];

    for (const { id } of data.messages) {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            const message = (await gmail.users.messages.get({
              id: id,
              userId: "km.corporatienl@gmail.com",
              auth: oAuthClient,
              format: "raw"
            })).data;

            if (!message.raw) return resolve();

            if (!message.labelIds) return resolve();

            const buffer = Buffer.from(message.raw, "base64");

            const plainEmail = buffer.toString("utf8");
            return resolve(plainEmail);
          } catch (error) {
            return reject(error);
          }
        })
      );
    }
    const plainEmails = await Promise.all(promises);
    return plainEmails;
  }
  private onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }
}

export default EmailAnalyzer;
