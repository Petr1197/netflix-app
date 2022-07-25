import { db } from "../../authContext";
import { getAuth } from "firebase/auth";
import { doc, arrayUnion, updateDoc, getDoc,  onSnapshot  } from "firebase/firestore";


const auth = getAuth();
const user = auth.currentUser;
const movieID = doc(db, "users", `${user?.email}`);
const docSnap =  getDoc(movieID)
export const data = onSnapshot(movieID, (doc) => {
    return doc.data()?.savedShows
})
