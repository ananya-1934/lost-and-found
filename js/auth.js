// js/auth.js
import { auth } from './firebase-init.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Handle UI Auth state globally across all pages
onAuthStateChanged(auth, (user) => {
    const authLinks = document.getElementById('auth-links');
    if (user) {
        // If the user is on the login page but already logged in, redirect them!
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
            return;
        }

        // User is signed in
        if(authLinks) {
            authLinks.innerHTML = `
                <a href="dashboard.html" style="margin-right: 15px; font-weight: 600;">My Dashboard</a>
                <a href="#" id="logout-btn" class="btn glass">Logout</a>
            `;
            // Attach logout event
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                signOut(auth).then(() => {
                    window.location.href = 'index.html';
                });
            });
        }
    } else {
        // User is signed out
        if(authLinks) {
            authLinks.innerHTML = `
                <a href="login.html" class="btn btn-primary">Sign In</a>
            `;
        }
    }
});

// If we are on the login page, attach the form handlers
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = loginForm.querySelector('button');
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.location.href = 'index.html';
            })
            .catch((error) => {
                btn.innerHTML = 'Sign In';
                alert("Error signing in: " + error.message);
            });
    });
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const btn = registerForm.querySelector('button');
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Update profile with display name
                return updateProfile(user, { displayName: name });
            })
            .then(() => {
                window.location.href = 'index.html';
            })
            .catch((error) => {
                btn.innerHTML = 'Create Account';
                alert("Error registering: " + error.message);
            });
    });
}
