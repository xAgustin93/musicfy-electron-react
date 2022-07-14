import {
  setDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from "lodash";
import { db } from "../utils";

export class Artist {
  collectionName = "artists";

  async create(image, name) {
    try {
      const idArtist = uuidv4();
      const created_at = new Date();
      const data = { id: idArtist, image, name, created_at };

      const docRef = doc(db, this.collectionName, idArtist);
      await setDoc(docRef, data);
    } catch (error) {
      throw error;
    }
  }

  async obtainAll() {
    try {
      const docRef = collection(db, this.collectionName);
      const snapshot = await getDocs(docRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }

  async getArtist(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      return snapshot.data();
    } catch (error) {
      throw error;
    }
  }

  async getLastArtists(limitItems = 20) {
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
