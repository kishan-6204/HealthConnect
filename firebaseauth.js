
 // firebaseauth.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKYY2XuJjQ4AhJKobIl_RnvuSmpr2IXAo",
    authDomain: "login-form-76fa2.firebaseapp.com",
    projectId: "login-form-76fa2",
    storageBucket: "login-form-76fa2.appspot.com",
    messagingSenderId: "906743815132",
    appId: "1:906743815132:web:650241e4133c28043c4d19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
            };
            showMessage("Account Created Successfully", "signUpMessage");
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == "auth/email-already-in-use") {
                showMessage("Email Address Already Exists !!!", "signUpMessage");
            } else {
                showMessage("unable to create User", "signUpMessage");
            }
        });
});

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage("login is successful", "signInMessage");
            const user = userCredential.user;
            localStorage.setItem("loggedInUserId", user.uid);
            window.location.href = "homepage.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                showMessage("Incorrect Email or Password", "signInMessage");
            } else {
                showMessage("Account does not Exist", "signInMessage");
            }
        });
});

function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            showMessage("Google sign-in successful", "signInMessage");
            localStorage.setItem("loggedInUserId", user.uid);
            window.location.href = "homepage.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            showMessage("Google sign-in error: " + errorMessage, "signInMessage");
        });
}

const googleButton = document.getElementById("googleSignInBtn");
googleButton.addEventListener("click", (event) => {
    event.preventDefault();
    googleSignIn();
});

const signUpButton = document.getElementById("signUpButton");
signUpButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("signIn").style.display = "none";
    document.getElementById("signup").style.display = "block";
});

//Add this code for the signInButton click event.
const signInButton = document.getElementById('signInButton');
signInButton.addEventListener('click',(event)=>{
    event.preventDefault();
    document.getElementById('signup').style.display = 'none';
    document.getElementById('signIn').style.display = 'block';
});
