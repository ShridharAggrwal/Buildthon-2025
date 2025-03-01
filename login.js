// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBsnl6taU7q0dcIR90bFosWZsuRTy8I6EI",
    authDomain: "women-safety-buildathon.firebaseapp.com",
    projectId: "women-safety-buildathon",
    storageBucket: "women-safety-buildathon.firebasestorage.app",
    messagingSenderId: "784691668616",
    appId: "1:784691668616:web:ac9d63ec9c9c354063a13d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Alert on button click
const submitbtn = document.getElementById('btnlogin');

submitbtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert('Login successful!');
      window.location.href = "home.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
