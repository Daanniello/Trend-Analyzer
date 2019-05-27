import Collection from "../../utils/enums/collection-enum";
import DatabaseService from "./database-service";
import IUpdate from "../../models/update-model";

class UpdateService extends DatabaseService<IUpdate> {
  collection: Collection = Collection.Updates;
}

export default UpdateService;
