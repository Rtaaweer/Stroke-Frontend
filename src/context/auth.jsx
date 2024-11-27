import {
    createUserWithEmailAndPassword,
    sendEmailVerification as firebaseSendEmailVerification // Renombrar para evitar conflictos
    ,

    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import {
    auth
} from "../firebase/firebase";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("There is no auth provider.");
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);

    const signup = async (email, password) =>
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userCreated = userCredential.user;
            console.log("New account created successfully! ", userCreated);
            return userCreated.uid;
        });

    const login = async (email, password) => 
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Corrige esta función para evitar recursión infinita
    const sendEmailVerification = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                await firebaseSendEmailVerification(currentUser); // Uso de la función importada de Firebase
                console.log("Email verification sent successfully!");
            } catch (error) {
                console.error("Error sending email verification:", error);
            }
        } else {
            console.error("No authenticated user to send email verification.");
        }
    };

    const updateUserPhotoUrl = async (newPhotoUrl) => {
        console.log("Last photo:", auth.currentUser.photoURL);
        console.log("New photo received:", newPhotoUrl);

        const updated = await updateProfile(auth.currentUser, {
            photoURL: newPhotoUrl,
        })
        .then(() => {
            console.log("Profile updated");
            console.log("New photo:", auth.currentUser.photoURL);
            return true;
        })
        .catch((error) => {
            console.error("Profile not updated:", error.message);
            return false;
        });

        return updated;
    };

    const updateUserName = async (newUserName) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: newUserName,
            });
            console.log("Profile updated");
        } catch (error) {
            console.error("Profile not updated:", error.message);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserId(currentUser.uid);
            }
            setLoading(false);
        });
    }, []);

    const logInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                userId,
                loading,
                signup,
                login,
                logout,
                logInWithGoogle,
                resetPassword,
                updateUserPhotoUrl,
                updateUserName,
                sendEmailVerification, // Uso de la función corregida
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
