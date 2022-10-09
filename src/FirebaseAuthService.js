import firebase from "./FirebaseConfig"

const auth = firebase.auth()

const registerUser = (email, password, username) => {
    auth.createUserWithEmailAndPassword(email, password)
    .then(res=>{
        // after it creates the account, it updates the user with the username input
        return res.user.updateProfile({
            displayName: username
        })
    })
}

const loginUser = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}

const logoutUser = () => {
    return auth.signOut();
}

const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email)
}

const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return auth.signInWithPopup(provider)
}

const subscribeToAuthChanges = (handleAuthChange) => {
    auth.onAuthStateChanged(user => {
        handleAuthChange(user)
    })
}

const editUserInfo = (username ,photoURL) => {
    auth.currentUser.updateProfile({
        displayName: username,
        photoURL: photoURL
    })
}

const FirebaseAuthService = {
    registerUser,
    loginUser,
    logoutUser,
    sendPasswordResetEmail,
    loginWithGoogle,
    subscribeToAuthChanges,
    editUserInfo,
}

export default FirebaseAuthService