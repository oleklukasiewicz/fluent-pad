import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";

import { Group, Item } from "../types/data";

import { User } from "../types/user";
import { IUserAPI, IStorageAPI, ApiItem, ApiGroup } from "../types/api";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURE_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

let userDB = "";

const pathToUsers = "users/";
const pathToItems = "items";
const pathToGroups = "groups";

const ItemConvertToFirebase = (item: Item) => {
    const fireItem = new ApiItem("");
    for (var i in fireItem)
        if (item.hasOwnProperty(i))
            fireItem[i] = item[i];
    return { ...fireItem };
};
const GroupConvertToFirebase = (group: Group) => {
    const fireGroup = new ApiGroup("");
    for (var i in fireGroup)
        if (group.hasOwnProperty(i))
            fireGroup[i] = group[i];
    return { ...fireGroup };
};
const ItemConvertToApp = (item: any) => {
    let appItem = new Item("");
    Object.assign(appItem, item);
    appItem.createDate = item.createDate.toDate();
    appItem.modifyDate = item.modifyDate.toDate();
    return appItem;
}
const GroupConvertToApp = (item: any) => {
    let appGroup = new Group("");
    Object.assign(appGroup, item);
    appGroup.itemsCount = item.itemsCount;
    appGroup.createDate = item.createDate.toDate();
    appGroup.modifyDate = item.modifyDate.toDate();
    return appGroup;
}

export const firebaseStorageAPI: IStorageAPI =
{
    generateItemId: () => doc(collection(db, userDB, pathToItems)).id,
    generateGroupId: () => doc(collection(db, userDB, pathToGroups)).id,

    group:
    {
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
            await setDoc(doc(db, userDB, pathToGroups, group.id),
                GroupConvertToFirebase(group));
        },
        update: async function (group: Group) {
            await updateDoc(doc(db, userDB, pathToGroups, group.id),
                GroupConvertToFirebase(group));
        },
        remove: async function (id: string) {
            await deleteDoc(doc(db, userDB, pathToGroups, id));
        },
    },
    item:
    {
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
                    docs.push(doc.data());
                });
            });
            return docs;
        },
        add: async function (item: Item) {
            await setDoc(doc(db, userDB, pathToItems, item.id),
                ItemConvertToFirebase(item));
        },
        update: async function (item: Item) {
            await updateDoc(doc(db, userDB, pathToItems, item.id), ItemConvertToFirebase(item));
        },
        remove: async function (id: string) {
            await deleteDoc(doc(db, userDB, pathToItems, id));
        },
    },

}
export const firebaseUserAPI: IUserAPI =
{

    login: async function (): Promise<User> {
        const user: any = await (await signInWithPopup(auth, provider)).user;
        if (user.uid)
            userDB = pathToUsers + user.uid;

        return new User(user.uid, user.displayName, user.photoURL) || {} as User;
    },
    logout: async function () {
        return await signOut(auth).then(() => {
            // Sign-out successful.
            userDB = "";
            return true;
        }).catch((error) => {
            return false;
            // An error happened.
        });
    }
}