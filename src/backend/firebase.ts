import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, updateDoc, deleteDoc, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import type { Group, Item } from "../types/data";
import { User } from "../types/user";
import type IBackend from "../types/backend";

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
    const fireItem = (({ groupIndex, ...o }) => o)(item);
    return fireItem;
};
const GroupConvertToFirebase = (group: Group) => {
    const fireGroup = (({ items, ...o }) => o)(group);
    return fireGroup;
};
const ItemConvertToApp = (item: any) => {
    item.createDate = item.createDate.toDate();
    item.modifyDate = item.modifyDate.toDate();
    return item;
}
const GroupConvertToApp = (item: any) => {
    item.items = [];
    item.createDate = item.createDate.toDate();
    item.modifyDate = item.modifyDate.toDate();
    return item;
}

export const firebaseBackend: IBackend =
{
    generateItemId:() => doc(collection(db, userDB, pathToItems)).id,
    generateGroupId:() => doc(collection(db, userDB, pathToGroups)).id,
    loadItems: async function () {
        const querySnapshot = await getDocs(collection(db, userDB, pathToItems));
        let items: any[] = [];
        querySnapshot.forEach((doc) => {
            let _item = doc.data();
            items.push(ItemConvertToApp(_item) as Item);
        });
        return items;
    },
    loadItem: async function (id: string) {
        const docRef = doc(db, userDB, pathToItems, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return ItemConvertToApp(docSnap.data()) as Item;
        } else {
            return {} as Item;
        }
    },
    addItem: async function (item: Item) {
        try {
            await setDoc(doc(db, userDB, pathToItems,item.id),
                ItemConvertToFirebase(item));
            return item;
        } catch (e) {
            console.error("Error adding document: ", e);
            return {} as Item;
        }
    },
    updateItem: async function (item: Item) {
        await updateDoc(doc(db, userDB, pathToItems, item.id), ItemConvertToFirebase(item));
        return item;
    },
    removeItem: async function (item: Item) {
        await deleteDoc(doc(db, userDB, pathToItems, item.id));
    },

    loadGroups: async function () {
        const querySnapshot = await getDocs(collection(db, userDB, pathToGroups));
        let items: any[] = [];
        querySnapshot.forEach((doc) => {
            let _item = doc.data();
            items.push(GroupConvertToApp(_item) as Group);
        });
        return items;
    },
    loadGroup: async function (id: string) {    
        const docRef = doc(db, userDB, pathToGroups, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return GroupConvertToApp(docSnap.data()) as Group;
        } else {
            return {} as Group;
        }
    },
    addGroup: async function (group: Group) {
        try {
            await setDoc(doc(db, userDB, pathToGroups,group.id),
                GroupConvertToFirebase(group));
            return group;
        } catch (e) {
            console.error("Error adding document: ", e);
            return {} as Group;
        }
    },
    updateGroup: async function (group: Group) {
        await updateDoc(doc(db, userDB, pathToGroups, group.id), GroupConvertToFirebase(group));
        return group;
    },
    removeGroup: async function (group: Group) {
        await deleteDoc(doc(db, userDB, pathToGroups, group.id));
    },
    loadUser: async function (): Promise<User> {
        const user: any = await (await signInWithPopup(auth, provider)).user;
        if (user.uid)
            userDB = pathToUsers + user.uid;
    
        return new User(user.uid, user.displayName, user.photoURL) || {} as User;
    },
    logoutUser: async function () {
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