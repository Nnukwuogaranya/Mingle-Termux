import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

function getFriendlyError(error: any): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already taken. Please log in, or use 'Forgot Password?'.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-not-found":
      return "No account was found with this email. Please create a new Mingle account.";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again or use 'Forgot Password?'.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";

    case "auth/network-request-failed":
      return "No internet connection. Please check your network and try again.";

    default:
      return error.message || "Something went wrong. Please try again.";
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    return userCredential.user;
  } catch (error: any) {
    throw new Error(getFriendlyError(error));
  }
}

export async function loginUser(
  email: string,
  password: string
) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error: any) {
    throw new Error(getFriendlyError(error));
  }
}

export async function forgotPassword(
  email: string
) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(getFriendlyError(error));
  }
}

export async function logoutUser() {
  await signOut(auth);
}
