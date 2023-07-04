import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  onAuthStateChanged,
  browserLocalPersistence,
} from "firebase/auth";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { Group, Item } from "$type/data";
import { User } from "$type/user";
import {
  type IUserAPI,
  type IStorageAPI,
  ApiItem,
  ApiGroup,
  type ISettingsAPI,
} from "$type/api";
import { DEFAULT_SETTINGS, type ISettings } from "$type/settings";

import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURE_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

let userDB = "";
const user = writable({} as User);

const pathToUsers = "users/";
const pathToItems = "items";
const pathToGroups = "groups";

const pathToSettings = "settings";
const settingsFileName = "settings";

user.subscribe((storedUser) => {
  userDB = storedUser.uid ? pathToUsers + storedUser.uid : "";
});

onAuthStateChanged(auth, (storedUser) => {
  if (storedUser) {
    user.set(storedUser);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const ItemConvertToFirebase = (item: Item) => {
  const fireItem = new ApiItem("");
  for (var i in fireItem) if (item.hasOwnProperty(i)) fireItem[i] = item[i];
  return { ...fireItem };
};
const GroupConvertToFirebase = (group: Group) => {
  const fireGroup = new ApiGroup("");
  for (var i in fireGroup) if (group.hasOwnProperty(i)) fireGroup[i] = group[i];
  return { ...fireGroup };
};

const ItemConvertToApp = (item: any) => {
  let appItem = new Item("");
  Object.assign(appItem, item);
  appItem.createDate = item.createDate.toDate();
  appItem.modifyDate = item.modifyDate.toDate();
  return appItem;
};
const GroupConvertToApp = (item: any) => {
  let appGroup = new Group("");
  Object.assign(appGroup, item);
  appGroup.itemsCount = item.itemsCount;
  appGroup.createDate = item.createDate.toDate();
  appGroup.modifyDate = item.modifyDate.toDate();
  return appGroup;
};

export const firebaseStorageAPI: IStorageAPI = {
  generateItemId: () => doc(collection(db, userDB, pathToItems)).id,
  generateGroupId: () => doc(collection(db, userDB, pathToGroups)).id,

  group: {
    search: async function (searchText: string) {
      const itemsRef = collection(db, userDB, pathToGroups);
      const q = query(itemsRef, where("groups", "array-contains", searchText));

      let docs = [];

      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
        });
      });
      return docs;
    },
    load: async function (id: string) {
      const docRef = doc(db, userDB, pathToGroups, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return GroupConvertToApp(docSnap.data()) as Group;
      } else {
        throw new Error("Group not found");
      }
    },
    loadAll: async function () {
      const querySnapshot = await getDocs(collection(db, userDB, pathToGroups));
      let items: any[] = [];
      querySnapshot.forEach((doc) => {
        let _item = doc.data();
        items.push(GroupConvertToApp(_item) as Group);
      });
      return items;
    },
    add: async function (group: Group) {
      await setDoc(
        doc(db, userDB, pathToGroups, group.id),
        GroupConvertToFirebase(group)
      );
    },
    update: async function (group: Group) {
      await updateDoc(
        doc(db, userDB, pathToGroups, group.id),
        GroupConvertToFirebase(group)
      );
    },
    remove: async function (id: string) {
      await deleteDoc(doc(db, userDB, pathToGroups, id));
    },
  },
  item: {
    search: async function (searchText: string) {
      const itemsRef = collection(db, userDB, pathToItems);
      const q = query(
        itemsRef,
        where("name", "array-contains", searchText),
        where("content", "==", searchText)
      );

      let docs = [];

      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
        });
      });
      return docs;
    },
    load: async function (id: string) {
      const docRef = doc(db, userDB, pathToItems, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return ItemConvertToApp(docSnap.data()) as Item;
      } else {
        throw new Error("Item not found");
      }
    },
    loadAll: async function () {
      const querySnapshot = await getDocs(collection(db, userDB, pathToItems));
      let items: any[] = [];
      querySnapshot.forEach((doc) => {
        let _item = doc.data();
        items.push(ItemConvertToApp(_item) as Item);
      });
      return items;
    },
    loadForGroup: async function (groupId: string) {
      const itemsRef = collection(db, userDB, pathToItems);
      const q = query(itemsRef, where("groups", "array-contains", groupId));

      let docs = [];

      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push(ItemConvertToApp(doc.data()) as Item);
        });
      });
      return docs;
    },
    add: async function (item: Item) {
      await setDoc(
        doc(db, userDB, pathToItems, item.id),
        ItemConvertToFirebase(item)
      );
    },
    update: async function (item: Item) {
      await updateDoc(
        doc(db, userDB, pathToItems, item.id),
        ItemConvertToFirebase(item)
      );
    },
    remove: async function (id: string) {
      await deleteDoc(doc(db, userDB, pathToItems, id));
    },
  },
};
export const firebaseUserAPI: IUserAPI = {
  login: async function (): Promise<User> {
    let tUser;
    if (user != null)
      await setPersistence(auth, browserLocalPersistence)
        .then(async () => {
          tUser = await (await signInWithPopup(auth, provider)).user;
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });

    return (
      new User(tUser.uid, tUser.displayName, tUser.photoURL) || ({} as User)
    );
  },
  logout: async function () {
    return await signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        user.set({} as User);
        return true;
      })
      .catch((error) => {
        return false;
        // An error happened.
      });
  },
  user: user,
};
export const firebaseSettingsAPI: ISettingsAPI = {
  load: async function () {
    const docRef = doc(db, userDB, pathToSettings, settingsFileName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ISettings;
    } else {
      return DEFAULT_SETTINGS;
    }
  },
  save: async function (settings: any) {
    await updateDoc(
      doc(db, userDB, pathToSettings, settingsFileName),
      settings
    );
  },
};
