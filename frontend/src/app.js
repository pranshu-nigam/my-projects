import { renderDashboard } from './components/Dashboard.js';
import toast from './components/Toast.js';
import { createZenPoseLogo } from './components/ZenPoseLogo.js';
import './styles/main.css';
import './styles/ai-pose-improved.css';
import './styles/ai-pose-new.css';


export function createApp() {
    console.log('createApp function called');
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('zenpose_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    const app = document.getElementById('app');
    if (!app) {
        console.error('App element not found!');
        return;
    }
    
    console.log('App element found:', app);
    
    // Check current page from URL or localStorage
    const currentPage = localStorage.getItem('zenpose_current_page') || 'login';
    console.log('Current page:', currentPage);
    
    // Check if user is logged in with valid token
    const isLoggedIn = localStorage.getItem('zenpose_user');
    const userToken = localStorage.getItem('zenpose_user_token');
    console.log('Is logged in:', !!isLoggedIn, 'Has token:', !!userToken);
    
                if (isLoggedIn && userToken && (currentPage === 'dashboard' || currentPage === 'profile' || currentPage === 'classes' || currentPage === 'progress' || currentPage === 'settings' || currentPage === 'ai-pose')) {
                // User is logged in with valid token, show appropriate page
                if (currentPage === 'profile') {
                    console.log('Rendering profile page...');
                    import('./components/Profile.js').then(module => {
                        module.renderProfile(app);
                    });
                } else if (currentPage === 'classes') {
                    console.log('Rendering classes page...');
                    import('./components/Classes.js').then(module => {
                        module.renderClasses(app);
                    });
                } else if (currentPage === 'progress') {
                    console.log('Rendering progress page...');
                    import('./components/Progress.js').then(module => {
                        module.renderProgress(app);
                    });
                } else if (currentPage === 'settings') {
                    console.log('Rendering settings page...');
                    import('./components/Settings.js').then(module => {
                        module.renderSettings(app);
                    });
                } else if (currentPage === 'ai-pose') {
                    console.log('Rendering NEW AI Pose page...');
                    import('./components/AIPoseNew.js').then(module => {
                        module.renderAIPoseNew(app);
                    });
                } else {
                    console.log('Rendering dashboard...');
                    renderDashboard(app);
                }
    } else if (currentPage === 'signup') {
        // Show signup page
        console.log('Showing signup page...');
        showSignupPage();
    } else {
        // User is not logged in or token is missing, show login page
        console.log('Rendering login page...');
        renderLoginPage(app);
    }
}

function renderLoginPage(app) {
    console.log('renderLoginPage called with app:', app);
    
    // Beautiful dark-themed login page HTML
    app.innerHTML = `
        <div class="auth-container">
            <div class="left-panel">
                <div class="yoga-silhouette-1">🧘‍♀️</div>
                <div class="yoga-silhouette-2">🧘‍♂️</div>
                <div class="yoga-silhouette-3">🧘‍♀️</div>
                <div class="left-content">
                    <div class="logo-section">
                        <div class="logo-circle zenpose-logo" id="app-login-logo">
                            <!-- ZenPose logo will be inserted here -->
                        </div>
                        <h1 class="brand-name">ZenPose</h1>
                    </div>
                    <h1 class="welcome-title">Welcome to ZenPose</h1>
                    <p class="welcome-subtitle">Begin your journey to inner peace and mindfulness</p>
                    <div class="feature-highlights">
                        <div class="feature-item">
                            <span class="feature-icon">🤖</span>
                            <div class="feature-text">
                                <h3>AI-Powered Guidance</h3>
                                <p>Advanced AI model analyzes your yoga poses in real-time, providing instant feedback to ensure perfect form and alignment.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🧘‍♀️</span>
                            <div class="feature-text">
                                <h3>Personalized Learning</h3>
                                <p>Get customized yoga sequences and pose corrections tailored to your skill level and body type.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">✨</span>
                            <div class="feature-text">
                                <h3>Mindful Wellness</h3>
                                <p>Transform your practice with guided meditation, breathing exercises, and stress-relief techniques.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="right-panel">
                <div class="rotating-dots-1"></div>
                <div class="rotating-dots-2"></div>
                <div class="rotating-dots-3">
                    <div class="dot-3"></div>
                </div>
                <div class="rotating-dots-4"></div>
                <div class="rotating-dots-5">
                    <div class="dot-5"></div>
                </div>
                <div class="floating-star-1">⭐</div>
                <div class="floating-star-2">✨</div>
                <div class="floating-star-3">🌟</div>
                <div class="floating-star-4">💫</div>
                <div class="floating-star-5">⭐</div>
                <div class="right-content">
                    <div class="form-header">
                        <h2 class="form-title">Sign in to your account</h2>
                        <p class="account-status">
                            Don't have an account?
                            <a href="#" class="signup-link">Sign up here</a>
                        </p>
                    </div>
                    
                    <form id="loginForm">
                        <div class="form-group">
                            <label class="form-label">Email or Username</label>
                            <input type="text" class="form-input email-input" placeholder="Enter your email or username" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <div class="password-container">
                                <input type="password" class="form-input password-input" placeholder="Enter your password" required>
                                <span class="password-toggle" id="passwordToggle">👁️</span>
                            </div>
                        </div>
                        
                        <button type="submit" class="submit-btn signin-btn">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Set current page to login
    localStorage.setItem('zenpose_current_page', 'login');
    
    // Setup login events
    setupLoginEvents();
    
    // Initialize ZenPose logo
    setTimeout(() => {
        const logoContainer = document.querySelector('#app-login-logo');
        if (logoContainer) {
            // Clear any existing content
            logoContainer.innerHTML = '';
            const zenposeLogo = createZenPoseLogo('w-20 h-20');
            logoContainer.appendChild(zenposeLogo);
        }
    }, 0);
    
}

function setupLoginEvents() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Signup link navigation
    const signupLink = document.querySelector('.signup-link');
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSignupPage();
        });
    }
    
    // Password toggle
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.querySelector('.password-input');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggle.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                passwordToggle.textContent = '👁️';
            }
        });
    }
}

async function handleLogin() {
    const email = document.querySelector('.email-input').value;
    const password = document.querySelector('.password-input').value;
    
    if (!email || !password) {
        toast.error('Please fill in all fields', 'Missing Information');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_or_username: email,
                password: password
            })
        });
        
        const data = await response.json();
        console.log('Login response:', data);
        
        if (response.ok) {
            console.log('Login successful, data:', data);
            
            // Store the token and user data
            localStorage.setItem('zenpose_user_token', data.access_token);
            localStorage.setItem('zenpose_user', JSON.stringify({
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                email: data.email,
                level: data.level
            }));
            localStorage.setItem('zenpose_current_page', 'dashboard');
            localStorage.setItem('zenpose_just_logged_in', 'true');
            
            toast.loginSuccess();
            
            // Render dashboard directly instead of reloading
            const app = document.getElementById('app');
            console.log('Rendering dashboard...');
            try {
                renderDashboard(app);
                console.log('Dashboard rendered successfully!');
            } catch (error) {
                console.error('Error rendering dashboard:', error);
                toast.error('Error loading dashboard. Please try refreshing the page.', 'Dashboard Error');
            }
        } else {
            // Handle different error response formats
            let errorMessage = 'Invalid credentials';
            if (data.detail) {
                errorMessage = typeof data.detail === 'string' ? data.detail : 'Invalid credentials';
            } else if (data.message) {
                errorMessage = data.message;
            }
            toast.error(errorMessage, 'Login Failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        toast.error('Login failed: Network error. Please try again.', 'Network Error');
    }
}

function showSignupPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="auth-container">
            <div class="left-panel">
                <div class="yoga-silhouette-1">🧘‍♀️</div>
                <div class="yoga-silhouette-2">🧘‍♂️</div>
                <div class="yoga-silhouette-3">🧘‍♀️</div>
                <div class="left-content">
                    <div class="logo-section">
                        <div class="logo-circle zenpose-logo" id="app-signup-logo">
                            <!-- ZenPose logo will be inserted here -->
                        </div>
                        <h1 class="brand-name">ZenPose</h1>
                    </div>
                    <h1 class="welcome-title">Join Us</h1>
                    <p class="welcome-subtitle">Start your wellness journey with ZenPose</p>
                    <div class="feature-highlights">
                        <div class="feature-item">
                            <span class="feature-icon">🤖</span>
                            <div class="feature-text">
                                <h3>AI-Powered Guidance</h3>
                                <p>Advanced AI model analyzes your yoga poses in real-time, providing instant feedback to ensure perfect form and alignment.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🧘‍♀️</span>
                            <div class="feature-text">
                                <h3>Personalized Learning</h3>
                                <p>Get customized yoga sequences and pose corrections tailored to your skill level and body type.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">✨</span>
                            <div class="feature-text">
                                <h3>Mindful Wellness</h3>
                                <p>Transform your practice with guided meditation, breathing exercises, and stress-relief techniques.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="right-panel">
                <div class="rotating-dots-1"></div>
                <div class="rotating-dots-2"></div>
                <div class="rotating-dots-3">
                    <div class="dot-3"></div>
                </div>
                <div class="rotating-dots-4"></div>
                <div class="rotating-dots-5">
                    <div class="dot-5"></div>
                </div>
                <div class="floating-star-1">⭐</div>
                <div class="floating-star-2">✨</div>
                <div class="floating-star-3">🌟</div>
                <div class="floating-star-4">💫</div>
                <div class="floating-star-5">⭐</div>
                <div class="right-content">
                    <div class="form-header">
                        <h2 class="form-title">Create your account</h2>
                        <p class="account-status">
                            Already have an account?
                            <a href="#" class="login-link">Sign in here</a>
                        </p>
                    </div>
                    
                    <form id="signupForm">
                        <div class="name-row">
                            <div class="form-group name-group">
                                <label class="form-label">First Name</label>
                                <input type="text" class="form-input firstname-input" placeholder="First name" required>
                            </div>
                            
                            <div class="form-group name-group">
                                <label class="form-label">Last Name</label>
                                <input type="text" class="form-input lastname-input" placeholder="Last name" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Choose Your Username</label>
                            <input type="text" class="form-input username-input" placeholder="Pick something unique and memorable" required>
                            <div class="input-helper">
                                <span class="helper-text">👤 3-20 characters, letters, numbers, and underscores only</span>
                            </div>
                            <div class="error-message username-error" style="display: none;">
                                <span class="error-icon">❌</span>
                                <span class="error-text">Username must be 3-20 characters with letters, numbers, and underscores only</span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input email-input" placeholder="Enter your email (e.g., user@gmail.com)" required>
                            <div class="input-helper">
                                <span class="helper-text">📧 Must contain @ and valid domain (gmail.com, yahoo.com, outlook.com, etc.)</span>
                            </div>
                            <div class="error-message email-error" style="display: none;">
                                <span class="error-icon">❌</span>
                                <span class="error-text">Invalid email format</span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <div class="password-container">
                                <input type="password" class="form-input password-input" placeholder="Create a strong password" required>
                                <span class="password-toggle" id="signupPasswordToggle">👁️</span>
                            </div>
                            <div class="input-helper">
                                <span class="helper-text">🔒 Must be at least 8 characters with uppercase, lowercase, number, and special character</span>
                            </div>
                            <div class="error-message password-error" style="display: none;">
                                <span class="error-icon">❌</span>
                                <span class="error-text">Password must be at least 8 characters with uppercase, lowercase, number, and special character</span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Confirm Password</label>
                            <div class="password-container">
                                <input type="password" class="form-input confirm-password-input" placeholder="Confirm your password" required>
                                <span class="password-toggle" id="signupConfirmPasswordToggle">👁️</span>
                            </div>
                            <div class="error-message confirm-password-error" style="display: none;">
                                <span class="error-icon">❌</span>
                                <span class="error-text">Passwords do not match</span>
                            </div>
                        </div>
                        
                        <button type="submit" class="submit-btn signup-btn">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Set current page to signup
    localStorage.setItem('zenpose_current_page', 'signup');
    
    // Setup signup events
    setupSignupEvents();
    
    // Initialize ZenPose logo
    setTimeout(() => {
        const logoContainer = document.querySelector('#app-signup-logo');
        if (logoContainer) {
            // Clear any existing content
            logoContainer.innerHTML = '';
            const zenposeLogo = createZenPoseLogo('w-20 h-20');
            logoContainer.appendChild(zenposeLogo);
        }
    }, 0);
    
}

function setupSignupEvents() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSignup();
        });
    }
    
    // Login link navigation
    const loginLink = document.querySelector('.login-link');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            renderLoginPage(document.getElementById('app'));
        });
    }
    
    // Password toggles
    const signupPasswordToggle = document.getElementById('signupPasswordToggle');
    const signupPasswordInput = document.querySelector('.password-input');
    const signupConfirmPasswordToggle = document.getElementById('signupConfirmPasswordToggle');
    const signupConfirmPasswordInput = document.querySelector('.confirm-password-input');
    
    if (signupPasswordToggle && signupPasswordInput) {
        signupPasswordToggle.addEventListener('click', () => {
            if (signupPasswordInput.type === 'password') {
                signupPasswordInput.type = 'text';
                signupPasswordToggle.textContent = '🙈';
            } else {
                signupPasswordInput.type = 'password';
                signupPasswordToggle.textContent = '👁️';
            }
        });
    }
    
    if (signupConfirmPasswordToggle && signupConfirmPasswordInput) {
        signupConfirmPasswordToggle.addEventListener('click', () => {
            if (signupConfirmPasswordInput.type === 'password') {
                signupConfirmPasswordInput.type = 'text';
                signupConfirmPasswordToggle.textContent = '🙈';
            } else {
                signupConfirmPasswordInput.type = 'password';
                signupConfirmPasswordToggle.textContent = '👁️';
            }
        });
    }
    
    // Real-time validation
    const usernameInput = document.querySelector('.username-input');
    const emailInput = document.querySelector('.email-input');
    const passwordInput = document.querySelector('.password-input');
    const confirmPasswordInput = document.querySelector('.confirm-password-input');
    
    if (usernameInput) {
        usernameInput.addEventListener('input', validateUsername);
        usernameInput.addEventListener('blur', validateUsername);
    }
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
        emailInput.addEventListener('blur', validateEmail);
    }
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
        passwordInput.addEventListener('blur', validatePassword);
    }
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validateConfirmPassword);
        confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    }
}

async function handleSignup() {
    const firstName = document.querySelector('.firstname-input').value;
    const lastName = document.querySelector('.lastname-input').value;
    const username = document.querySelector('.username-input').value;
    const email = document.querySelector('.email-input').value;
    const password = document.querySelector('.password-input').value;
    const confirmPassword = document.querySelector('.confirm-password-input').value;
    
    // Basic field validation
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
        toast.error('Please fill in all fields', 'Missing Information');
        return;
    }
    
    // Username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
        toast.error('Username must be 3-20 characters long and contain only letters, numbers, and underscores', 'Invalid Username');
        return;
    }
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        toast.error('Please enter a valid email address (e.g., user@gmail.com, user@yahoo.com)', 'Invalid Email');
        return;
    }
    
    // Email domain validation
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'protonmail.com'];
    const emailDomain = email.split('@')[1];
    if (!validDomains.includes(emailDomain)) {
        toast.error('Please use a common email provider (Gmail, Yahoo, Outlook, Hotmail, iCloud, ProtonMail)', 'Invalid Email Domain');
        return;
    }
    
    // Password validation
    if (password !== confirmPassword) {
        toast.error('Passwords do not match', 'Password Mismatch');
        return;
    }
    
    if (password.length < 8) {
        toast.error('Password must be at least 8 characters long', 'Password Too Short');
        return;
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        toast.error('Password must contain: At least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character', 'Weak Password');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            toast.signupSuccess();
            // Go back to login page
            localStorage.setItem('zenpose_current_page', 'login');
            renderLoginPage(document.getElementById('app'));
        } else {
            let errorMessage = 'Error creating account';
            if (data.detail) {
                errorMessage = typeof data.detail === 'string' ? data.detail : 'Error creating account';
            } else if (data.message) {
                errorMessage = data.message;
            }
            toast.error(errorMessage, 'Signup Failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        toast.error('Signup failed: Network error. Please try again.', 'Network Error');
    }
}

function validateUsername() {
    const usernameInput = document.querySelector('.username-input');
    const usernameError = document.querySelector('.username-error');
    const username = usernameInput.value.trim();
    
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const isValid = usernameRegex.test(username);
    
    if (username && !isValid) {
        usernameError.style.display = 'flex';
        usernameInput.style.borderColor = '#ef4444';
    } else {
        usernameError.style.display = 'none';
        usernameInput.style.borderColor = username ? '#10b981' : 'rgba(148, 163, 184, 0.2)';
    }
}

function validateEmail() {
    const emailInput = document.querySelector('.email-input');
    const emailError = document.querySelector('.email-error');
    const email = emailInput.value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (email && !isValid) {
        emailError.style.display = 'flex';
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailError.style.display = 'none';
        emailInput.style.borderColor = email ? '#10b981' : 'rgba(148, 163, 184, 0.2)';
    }
}

function validatePassword() {
    const passwordInput = document.querySelector('.password-input');
    const passwordError = document.querySelector('.password-error');
    const password = passwordInput.value;
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = passwordRegex.test(password);
    
    if (password && !isValid) {
        passwordError.style.display = 'flex';
        passwordInput.style.borderColor = '#ef4444';
    } else {
        passwordError.style.display = 'none';
        passwordInput.style.borderColor = password ? '#10b981' : 'rgba(148, 163, 184, 0.2)';
    }
    
    // Also validate confirm password if it has a value
    const confirmPasswordInput = document.querySelector('.confirm-password-input');
    if (confirmPasswordInput.value) {
        validateConfirmPassword();
    }
}

function validateConfirmPassword() {
    const passwordInput = document.querySelector('.password-input');
    const confirmPasswordInput = document.querySelector('.confirm-password-input');
    const confirmPasswordError = document.querySelector('.confirm-password-error');
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordError.style.display = 'flex';
        confirmPasswordInput.style.borderColor = '#ef4444';
    } else {
        confirmPasswordError.style.display = 'none';
        confirmPasswordInput.style.borderColor = confirmPassword ? '#10b981' : 'rgba(148, 163, 184, 0.2)';
    }
}

// Global function to switch between pages
window.switchToDashboard = function() {
    const app = document.getElementById('app');
    renderDashboard(app);
};

window.switchToLogin = function() {
    const app = document.getElementById('app');
    renderLoginPage(app);
};

// Initialize the app
console.log('About to call createApp...');
createApp();
console.log('createApp called successfully!');
