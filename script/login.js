// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

  import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

  import {
    getDatabase,
    ref,
    onValue,
  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBhmOoAIMsZyc10v6ljfC8Z-1qzNX0qXFw",
    authDomain: "myproject-58656.firebaseapp.com",
    projectId: "myproject-58656",
    storageBucket: "myproject-58656.appspot.com",
    messagingSenderId: "332827951988",
    appId: "1:332827951988:web:a047ef463eb1afce8ee221",
    measurementId: "G-FP2C2ZGBYC",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase();

  document.getElementById("login_btn").addEventListener("click", function () {
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_password").value;
    const errorElement = document.getElementById("error-message"); // Get the error message element

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const starCountRef = ref(db, "users/" + user.uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
        });

        console.log(user);
        alert("Login Successfully");
        document.getElementById("logout-btn").style.display = "block";
      })
      .catch((error) => {
        const errorCode = error.code;
        
        if (errorCode === "auth/user-not-found") {
            errorElement.textContent = "User not registered.";
        } else if (errorCode === "auth/wrong-password") {
            errorElement.textContent = "Incorrect email or password.";
        } else {
            errorElement.textContent = errorMessage;
        }
        
        errorElement.style.display = "block"; // Show the error message
        console.log(error.message);
      });
  });

  document.getElementById("logout-btn").addEventListener("click", function () {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("logout Successfully");
        location.href = "./signup.html";
      })
      .catch((error) => {
        console.log(error.message);
      });
  });




