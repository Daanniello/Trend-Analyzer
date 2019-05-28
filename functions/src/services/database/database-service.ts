import * as admin from "firebase-admin";
import Collection from "../../utils/enums/collection-enum";

abstract class DatabaseService<T> {
  db: FirebaseFirestore.Firestore = admin.firestore();
  collection: Collection = Collection.Credentials;

  async get(key: string): Promise<T> {
    // Create a reference to the database collection
    const collectionRef = this.db.collection(this.collection);
    // Create a reference to the database document
    const documentRef = collectionRef.doc(key);
    // Retrieve the data at KEY
    const doc = await documentRef.get();

    return doc.data() as T;
  }

  async getQuery(options: any): Promise<T[]> {
    // Create a reference to the database collection
    const collectionRef = this.db.collection(this.collection);

    // Create the query reference
    let queryRef:
      | FirebaseFirestore.CollectionReference
      | FirebaseFirestore.Query = collectionRef;
    // Apply options
    for (const prop in options) {
      queryRef = queryRef.where(prop, "==", options[prop]);
    }

    // Get the snapshot of all documents in the collection
    const snapshot = await queryRef.get();

    // Map the data of the documents to the correct Type
    const docs = snapshot.docs.map(doc => {
      return doc.data() as T;
    });

    return docs;
  }

  async getAll(): Promise<T[]> {
    // Create a reference to the database collection
    const collectionRef = this.db.collection(this.collection);

    // Get the snapshot of all documents in the collection
    const snapshot = await collectionRef.get();

    // Map the data of the documents to the correct Type
    const docs = snapshot.docs.map(doc => {
      return doc.data() as T;
    });

    return docs;
  }

  async add(data: T): Promise<FirebaseFirestore.DocumentReference> {
    // Create a reference to the database collection
    const collectionRef = this.db.collection(this.collection);
    const documentRef = await collectionRef.add(data);
    return documentRef;
  }

  async set(
    key: string,
    data: T
  ): Promise<FirebaseFirestore.DocumentReference> {
    // Create a reference to the database collection
    const collectionRef = this.db.collection(this.collection);
    const documentRef = collectionRef.doc(key);
    await documentRef.set(data, { merge: true });
    return documentRef;
  }

  async delete(key: string): Promise<FirebaseFirestore.WriteResult> {
    // Create a reference to the database collection
    const collectionRef = this.db.collection(this.collection);
    const documentRef = collectionRef.doc(key);
    const result = await documentRef.delete();
    return result;
  }

  async deleteAll(): Promise<FirebaseFirestore.WriteResult[]> {
    // Create a reference to the database collection
    const collectionRef = this.db.collection(this.collection);

    // Get the snapshot of all documents in the collection
    const snapshot = await collectionRef.get();

    // Create batch to store operations before execution
    const batch = this.db.batch();
    for (const doc of snapshot.docs) {
      batch.delete(doc.ref);
    }
    const writeResults = await batch.commit();

    return writeResults;
  }
}

export default DatabaseService;
