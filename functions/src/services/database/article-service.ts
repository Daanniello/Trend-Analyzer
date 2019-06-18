import Collection from "../../utils/enums/collection-enum";
import DatabaseService from "./database-service";
import IArticle from "../../models/article-model";

class ArticleService extends DatabaseService<IArticle> {
  collection: Collection = Collection.Articles;

  async incrementMailOccurence(
    articleLink: string,
    mailLink: string
  ): Promise<IArticle[]> {
    // Create a reference to the database collection
    const collectionRef = this.db.collection(this.collection);

    const queryRef = collectionRef.where("url", "==", articleLink);

    const snapshot = await queryRef.get();

    let docs: IArticle[] = [];
    try {
      docs = await Promise.all(
        snapshot.docs.map(async doc => {
          //const docRef = doc.ref;
          const docData = doc.data() as IArticle;

          if (!docData.mailOccurrences) {
            docData.mailOccurrences = [];
          }

          if (docData.mailOccurrences.indexOf(mailLink) < 0) {
            docData.mailOccurrences.push(mailLink);

            // await docRef.set(docData, { merge: true });
          } else {
            throw new Error("This is an error I promise...");
          }

          return docData;
        })
      );
    } catch (error) {
      throw error;
    }

    console.log(`SETQUERY DOCUMENTS FROM ${this.collection}`);

    return docs;
  }
}

export default ArticleService;
