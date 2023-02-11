import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import type { Group, Item } from "../data/Data";

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
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

let userDB = "";

const pathToUsers = "users/";
const pathToItems = "items";
const pathToGroups = "groups";

export let userAuth = async function () {
    return await signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            let user = result.user;
            userDB = pathToUsers + user.uid;
            return user;
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(errorCode, errorMessage);
        });
}

export let userLogOut = async function () {
    return await signOut(auth).then(() => {
        // Sign-out successful.
        userDB = "";
        return true;
    }).catch((error) => {
        return false;
        // An error happened.
    });
}

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
export const GenerateItemId = () => doc(collection(db, userDB, pathToItems)).id
export const GenerateGroupId = () => doc(collection(db, userDB, pathToGroups)).id

export let addItemToFirestore = async function (item: Item, id = GenerateItemId()) {
    try {
        await setDoc(doc(db, userDB, pathToItems, id),
            ItemConvertToFirebase(item));
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
export let updateItemInFirestore = async function (item: Item) {
    await updateDoc(doc(db, userDB, pathToItems, item.id), ItemConvertToFirebase(item));
}
export let removeItemInFirestore = async function (item: Item) {
    await deleteDoc(doc(db, userDB, pathToItems, item.id));
}
export let loadItemsFromFirestore = async function () {

    const querySnapshot = await getDocs(collection(db, userDB, pathToItems));
    let items: any[] = [];
    querySnapshot.forEach((doc) => {
        let _item = doc.data();
        items.push(ItemConvertToApp(_item));
    });
    return items;
}

export let addGroupToFirestore = async function (group: Group, id = GenerateGroupId()) {
    try {
        await setDoc(doc(db, userDB, pathToGroups, id),
            GroupConvertToFirebase(group));
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
export let updateGroupInFirestore = async function (group: Group) {
    await updateDoc(doc(db, userDB, pathToGroups, group.id), GroupConvertToFirebase(group));
}
export let removeGroupInFirestore = async function (group: Group) {
    await deleteDoc(doc(db, userDB, pathToGroups, group.id));
}
export let loadGroupsFromFirestore = async function () {

    const querySnapshot = await getDocs(collection(db, userDB, pathToGroups));
    let items: any[] = [];
    querySnapshot.forEach((doc) => {
        let _item = doc.data();
        items.push(GroupConvertToApp(_item));
    });
    return items;
}