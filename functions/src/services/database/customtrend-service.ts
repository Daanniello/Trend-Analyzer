import Collection from "../../utils/enums/collection-enum";
import DatabaseService from "./database-service";
import ICustomTrend from "../../models/customtrend-model";

class CustomTrendService extends DatabaseService<ICustomTrend> {
  collection: Collection = Collection.CustomTrends;
}

export default CustomTrendService;
