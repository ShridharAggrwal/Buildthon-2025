// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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

// Reference to the form
const form = document.getElementById("register-form");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const guardianNumber = document.getElementById("guardian-number").value.trim();

    if (!email || !password || !guardianNumber) {
        alert("All fields are required!");
        return;
    }

    try {
        // Step 1: Create Firebase User
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Firebase User Created:", user.uid);
        alert("Account created successfully!");

        // Step 2: Store Guardian Number in MongoDB
        const response = await fetch("http://localhost:5000/api/guardian", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ guardianNumber }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Guardian Number saved successfully!");
            form.reset();
            window.location.href = "home.html"; // Redirect after both steps are successful
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert(error.message || "An error occurred. Please try again.");
    }
});
