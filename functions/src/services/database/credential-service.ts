import Collection from "../../utils/enums/collection-enum";
import DatabaseService from "./database-service";
import ICredential from "../../models/credential-model";

class ArticleService extends DatabaseService<ICredential> {
  collection: Collection = Collection.Credentials;
}

export default ArticleService;
