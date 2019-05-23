import Collection from "../../utils/enums/collection-enum";
import DatabaseService from "./database-service";
import IUpdate from "../../models/update-model";

class ArticleService extends DatabaseService<IUpdate> {
  collection: Collection = Collection.Updates;
}

export default ArticleService;
