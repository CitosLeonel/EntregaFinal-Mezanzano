import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getFirestore,
} from "firebase/firestore";

export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();

    const itemDoc = doc(db, "items", id);

    getDoc(itemDoc)
      .then((doc) => {
        if (doc.exists()) {
          resolve({ id: doc.id, ...doc.data() });
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProducts = (categoryId) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();

    const itemCollection = collection(db, "items");

    let q;
    if (categoryId) {
      q = query(itemCollection, where("categoryId", "==", categoryId));
    } else {
      q = query(itemCollection);
    }

    getDocs(q)
      .then((querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createOrder = (orden) => {
  const db = getFirestore();

  const ordersCollection = collection(db, "orders");

  return addDoc(ordersCollection, orden);
};
