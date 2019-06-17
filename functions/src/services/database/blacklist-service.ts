import Collection from "../../utils/enums/collection-enum";
import DatabaseService from "./database-service";
import IBlacklist from "../../models/blacklist-model";

class BlackListService extends DatabaseService<IBlacklist> {
  collection: Collection = Collection.Blacklists;
}

export default BlackListService;
