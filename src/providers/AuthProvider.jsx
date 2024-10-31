import React, { createContext, useEffect, useState } from "react"; // Import necessary React libraries
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../config/firebase.config";

// Create a context for authentication, with a default value of null
export const AuthContext = createContext(null);

// Initialize Firebase authentication
const auth = getAuth(app);

// Initialize Google auth provider
const googleProvider = new GoogleAuthProvider();

// Initialize Facebook auth provider
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  // State to hold the current user and loading status
  const [user, setUser] = useState(null); // user state initialized to null
  const [loading, setLoading] = useState(true); // loading state initialized to true

  // Function to create a new user with email and password
  const createNewUser = (email, password) => {
    setLoading(true); // Set loading to true while creating user
    return createUserWithEmailAndPassword(auth, email, password); // Create user and return the promise
  };

  // Function to log in an existing user
  const loginUser = (email, password) => {
    setLoading(true); // Set loading to true while logging in
    return signInWithEmailAndPassword(auth, email, password); // Log in user and return the promise
  };

  // Function to log in with Google
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Function to log in with Facebook
  const facebookLogin = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  // Function to log out the current user
  const logoutUser = () => {
    setLoading(true); // Set loading to true while logging out
    return signOut(auth); // Log out user and return the promise
  };

  // Function to update user profile with name and photo
  const updateUserProfile = (nameValue, photoValue) => {
    return updateProfile(auth.currentUser, {
      displayName: nameValue, // Set display name
      photoURL: photoValue, // Set photo URL
    });
  };

  // Effect to observe changes in authentication state
  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state with the current user
      setLoading(false); // Set loading to false after user state is updated
    });
    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Auth information to be provided through context
  const authInfo = {
    user,
    loading,
    createNewUser,
    loginUser,
    googleLogin,
    facebookLogin,
    logoutUser,
    updateUserProfile,
  };

  // Provide auth information to children components
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// Export the AuthProvider component for use in the application
export default AuthProvider;
