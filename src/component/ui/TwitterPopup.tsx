import { Box } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getFirestore, getDoc, sum } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import "../popup.css";

export interface TwitterSidePaneProps {
  profile: string;
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { configuration } from "../../constant/config";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const imgUrl = chrome.runtime.getURL("logo.png");

export const TwitterPopup = () => {
  const auth = getAuth(app);

  const [loginMode, setLoginMode] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const [subscription, setSubscription] = useState<any>(null);

  // Get the premium subscription from Firebase

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const customersDoc = `customers/${user.uid}`;
        const docRef = doc(db, customersDoc);
        const documentSnapShot = await getDoc(docRef);
        if (documentSnapShot.exists()) {
          setSubscription(documentSnapShot.data());
          console.log(documentSnapShot.data());
        } else {
          setSubscription(null);
        }
      }
    });
  }, []);

  async function performAction(e: React.MouseEvent<HTMLButtonElement>) {
    if (loginMode) {
      const response = await handleLogin(e);
    } else {
      const response = await handleRegister(e);
    }
  }

  async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    // Handle Firebase Sign-in method

    // use the signInWithEmailAndPassword method to sign in the user

    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
      .finally(() => setLoading(false));
    if (userCredential) {
      return userCredential.user;
    }
    return null;
  }

  async function subscribeStripe() {
    await chrome.runtime.sendMessage({
      type: "subscribe",
      stripeLink: `${configuration.stripe}?prefilled_email=${user.email}`,
    });
  }

  async function logOut() {
    await auth.signOut();
    location.reload();
  }

  async function handleRegister(e: React.MouseEvent<HTMLButtonElement>) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
      .finally(() => setLoading(false));
    if (userCredential) {
      return userCredential.user;
    }
    return null;
  }

  return (
    <>
      <Box className={"p-5"} flexDirection={"column"} display={"flex"}>
        <div>
          <img src={imgUrl} alt="Logo" className={"rounded-xl mb-5 w-2/12"} />
        </div>
        <h2 className={"font-bold text-lg mb-2"}>Pro Access</h2>
        <p className={"text-sm border-b border-gray-200 pb-5"}>
          Create a free account for storing 100 tags or upgrade to Pro for
          unlimited storage.
        </p>
        {!user && (
          <>
            <div className="form">
              <div className={"flex flex-col mt-5 gap-2"}>
                <span className={"font-bold text-sm"}>Username</span>
                <input
                  type="text"
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  className={"rounded border p-2"}
                />
              </div>
              <div className={"flex flex-col mt-5 gap-2"}>
                <span className={"font-bold text-sm"}>Password</span>
                <input
                  type="password"
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  className={"rounded border p-2"}
                />
              </div>
              <button
                onClick={(e) => performAction(e)}
                className={
                  "rounded hover:bg-blue-900 bg-blue-950 text-white mt-5 w-full text-sm p-2 flex flex-row justify-center gap-5"
                }
              >
                {loading && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 38 38"
                    >
                      <defs>
                        <linearGradient
                          x1="8.042%"
                          y1="0%"
                          x2="65.682%"
                          y2="23.865%"
                          id="a"
                        >
                          <stop stopColor="#fff" stopOpacity="0" offset="0%" />
                          <stop
                            stopColor="#fff"
                            stopOpacity=".631"
                            offset="63.146%"
                          />
                          <stop stopColor="#fff" offset="100%" />
                        </linearGradient>
                      </defs>
                      <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)">
                          <path
                            d="M36 18c0-9.94-8.06-18-18-18"
                            id="Oval-2"
                            stroke="url(#a)"
                            strokeWidth="2"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 18 18"
                              to="360 18 18"
                              dur="0.9s"
                              repeatCount="indefinite"
                            />
                          </path>
                          <circle fill="#fff" cx="36" cy="18" r="1">
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 18 18"
                              to="360 18 18"
                              dur="0.9s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                )}
                {loginMode ? "Sign in" : "Create an account"}
              </button>
            </div>
            {loginMode && (
              <a
                onClick={() => setLoginMode(false)}
                className={"cursor-pointer underline text-center mt-5"}
              >
                Create an account
              </a>
            )}
            {!loginMode && (
              <a
                onClick={() => setLoginMode(true)}
                className={"cursor-pointer underline text-center mt-5"}
              >
                Sign in
              </a>
            )}
          </>
        )}
        {user && (
          <>
            <div className={"flex flex-col p-3 px-0"}>
              <span className={"font-bold text-sm"}>Email</span>
              <span>{user.email}</span>
            </div>

            <div className={"flex flex-col p-3 px-0"}>
              <span className={"font-bold text-sm"}>Auth ID</span>
              <span>{user.uid}</span>
            </div>

            <div className={"flex flex-col p-3 px-0"}>
              <span className={"font-bold text-sm"}>Display Name</span>
              <span>{subscription?.name}</span>
            </div>

            <div className={"flex flex-col p-3 px-0"}>
              <span className={"font-bold text-sm"}>Subscription </span>
              <span>
                {!subscription?.metadata.hasOwnProperty("firebaseRole")
                  ? "Basic"
                  : subscription?.metadata["firebaseRole"].toUpperCase()}
              </span>
            </div>
            {!subscription?.metadata.hasOwnProperty("firebaseRole") && (
              <>
                <button
                  onClick={() => subscribeStripe()}
                  className={"p-2 rounded bg-blue-700 text-white"}
                >
                  Upgrade to Premium
                </button>
                <a
                  onClick={logOut}
                  className={"p-2 text-center cursor-pointer"}
                >
                  Logout
                </a>
              </>
            )}

            {subscription &&
              subscription.metadata &&
              subscription?.metadata.firebaseRole === "premium" && (
                <div className={"p-2 text-blue-500 font-bold text-center"}>
                  Subscribed to Premium
                </div>
              )}
          </>
        )}
      </Box>
    </>
  );
};
