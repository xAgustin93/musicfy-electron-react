import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class Storage {
  async uploadFile(file, folder, nameFile) {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, `${folder}/${nameFile}`);
      return await uploadBytes(fileRef, file);
    } catch (error) {
      throw error;
    }
  }

  async getUrlFile(pathFile) {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, pathFile);
      return await getDownloadURL(fileRef);
    } catch (error) {
      throw error;
    }
  }
}
