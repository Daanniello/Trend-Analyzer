import Collection from "../../utils/enums/collection-enum";
import DatabaseService from "./database-service";
import IArticle from "../../models/article-model";

class ArticleService extends DatabaseService<IArticle> {
  collection: Collection = Collection.Articles;
}

export default ArticleService;
