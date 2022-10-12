import firebase from "./FirebaseConfig"

const firestore = firebase.firestore();

const createTask = (collection, task) => {
    return firestore.collection(collection).add(task)
}

const FirebaseFireStoreService = {
    createTask
}

export default FirebaseFireStoreService;