// app.js - Global UI Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if(themeToggleBtn) {
            if (theme === 'dark') {
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }

    // 2. Mock Auth UI Update (Will be replaced by auth.js logic)
    // This just simulates how the navbar will change once logged in.
    const mockLoggedIn = false; // Change to true to test
    const authLinks = document.getElementById('auth-links');
    if(authLinks && mockLoggedIn) {
        authLinks.innerHTML = `
            <a href="dashboard.html" style="margin-right: 15px;">Dashboard</a>
            <a href="#" id="logout-btn" class="btn glass">Logout</a>
        `;
    }
});
