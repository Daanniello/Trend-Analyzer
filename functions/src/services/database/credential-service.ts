import Collection from "../../utils/enums/collection-enum";
import DatabaseService from "./database-service";
import ICredential from "../../models/credential-model";

class CredentialService extends DatabaseService<ICredential> {
  collection: Collection = Collection.Credentials;
}

export default CredentialService;
