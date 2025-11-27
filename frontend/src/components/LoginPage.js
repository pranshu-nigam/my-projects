import { createLeftPanel } from './LeftPanel.js';
import { createRightPanel } from './RightPanel.js';

export function renderLoginPage(container) {
    // Clear container
    container.innerHTML = '';
    
    // Create main layout
    const loginPage = document.createElement('div');
    loginPage.className = 'login-page';
    
    // Create main content container
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    // Add left and right panels
    mainContent.appendChild(createLeftPanel());
    mainContent.appendChild(createRightPanel());
    
    // Add floating particles for background beauty
    addFloatingParticles(loginPage);
    
    loginPage.appendChild(mainContent);
    container.appendChild(loginPage);
    
    // Initialize form functionality
    initializeFormHandlers(container);
}

function addFloatingParticles(container) {
    // Create floating particles for visual appeal
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(particle);
    }
}

function initializeFormHandlers(container) {
    // Password visibility toggle
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.querySelector('.password-input');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            passwordToggle.innerHTML = type === 'password' ? '👁️' : '🙈';
        });
    }
    
    // Form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin(container);
        });
    }
    
    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const appleBtn = document.querySelector('.apple-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => handleSocialLogin('google'));
    }
    
    if (appleBtn) {
        appleBtn.addEventListener('click', () => handleSocialLogin('apple'));
    }
    
    // Signup link - FIXED THIS!
    const signupLink = document.querySelector('.signup-link');
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Import and render signup page
            import('./SignupPage.js').then(({ renderSignupPage }) => {
                renderSignupPage(container);
            });
        });
    }
}

async function handleLogin(container) {
    const email = document.querySelector('.email-input').value;
    const password = document.querySelector('.password-input').value;
    
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.signin-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    try {
        // Call backend API
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
        
        if (response.ok) {
            // Login successful
            showMessage('Login successful! Redirecting...', 'success');
            
            // Store user data and token
            localStorage.setItem('zenpose_user', 'true');
            localStorage.setItem('zenpose_user_email', data.email);
            localStorage.setItem('zenpose_user_token', data.access_token);
            localStorage.setItem('zenpose_user_data', JSON.stringify({
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                level: data.level
            }));
            
            // Redirect to dashboard
            setTimeout(() => {
                window.switchToDashboard();
            }, 1000);
            
        } else {
            // Login failed
            showMessage(data.detail || 'Login failed. Please check your credentials.', 'error');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Network error. Please check your connection.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function handleSocialLogin(provider) {
    console.log(`Social login with ${provider}`);
    showMessage(`${provider} login will be implemented here`, 'info');
}

function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message-popup message-${type}`;
    messageEl.innerHTML = `
        <div class="message-content">
            <span class="message-text">${message}</span>
            <button class="message-close">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = messageEl.querySelector('.message-close');
    closeBtn.addEventListener('click', () => {
        messageEl.remove();
    });
}
