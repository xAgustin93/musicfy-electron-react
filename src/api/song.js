import {
  setDoc,
  doc,
  where,
  collection,
  query,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from "lodash";
import { db } from "../utils";

export class Song {
  collectionName = "songs";

  async create(name, album, file) {
    try {
      const id = uuidv4();
      const created_at = new Date();
      const data = { id, name, album, file, created_at };

      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, data);
    } catch (error) {
      throw error;
    }
  }

  async obtainAllByAlbum(idAlbum) {
    try {
      const whereRef = where("album", "==", idAlbum);
      const collectionRef = collection(db, this.collectionName);
      const queryRef = query(collectionRef, whereRef);

      const snapshot = await getDocs(queryRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }

  async getLastSongs(limitItems = 20) {
    try {
      const collectionRef = collection(db, this.collectionName);
      const orderByRef = orderBy("created_at", "desc");
      const limitRef = limit(limitItems);
      const queryRef = query(collectionRef, orderByRef, limitRef);

      const snapshot = await getDocs(queryRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }
}
