import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth"
import { auth,db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState("");
    const [watchlist, setWatchlist] = useState([]);

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
        return signOut(auth);
    }
    function googlesignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
    }

    useEffect(() => {
        if (user) {
          const coinRef = doc(db, "watchlist", user?.uid);
          var unsubscribe = onSnapshot(coinRef, (coin) => {
            if (coin.exists()) {
              console.log(coin.data().coins);
              setWatchlist(coin.data().coins);
            } else {
              console.log("No Items in Watchlist");
            }
          });
    
          return () => {
            unsubscribe();
          };
        }
      }, [user]);

    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        //     console.log("Auth", currentuser);
        //     setUser(currentuser);
        // });

        // return () => {
        //     unsubscribe();
        // };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Auth", user);
                setUser(user);
            } else {
                setUser( null )
            }
        })

    }, []);

    return (
        <userAuthContext.Provider
            value={
                {
                    user,
                    signUp,
                    logIn,
                    logOut,
                    googlesignIn,
                    watchlist,
                }
            }>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}