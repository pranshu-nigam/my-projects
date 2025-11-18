import { createLeftPanelSignup } from './LeftPanelSignup.js';
import { createRightPanelSignup } from './RightPanelSignup.js';

export function renderSignupPage(container) {
    // Clear container
    container.innerHTML = '';
    
    // Create main layout
    const signupPage = document.createElement('div');
    signupPage.className = 'login-page'; // Reusing the same layout styles
    
    // Create main content container
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    // Add left and right panels
    mainContent.appendChild(createLeftPanelSignup());
    mainContent.appendChild(createRightPanelSignup());
    
    // Add floating particles for background beauty
    addFloatingParticles(signupPage);
    
    signupPage.appendChild(mainContent);
    container.appendChild(signupPage);
    
    // Initialize form functionality
    initializeSignupFormHandlers();
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

function initializeSignupFormHandlers() {
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
    
    // Confirm password visibility toggle
    const confirmPasswordToggle = document.querySelector('.confirm-password-toggle');
    const confirmPasswordInput = document.querySelector('.confirm-password-input');
    
    if (confirmPasswordToggle && confirmPasswordInput) {
        confirmPasswordToggle.addEventListener('click', () => {
            const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
            confirmPasswordInput.type = type;
            confirmPasswordToggle.innerHTML = type === 'password' ? '👁️' : '🙈';
        });
    }
    
    // Password strength validation
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePasswordStrength);
    }
    
    // Form submission
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSignup();
        });
    }
    
    // Social signup buttons
    const googleBtn = document.querySelector('.google-btn');
    const appleBtn = document.querySelector('.apple-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => handleSocialSignup('google'));
    }
    
    if (appleBtn) {
        appleBtn.addEventListener('click', () => handleSocialSignup('apple'));
    }
    
    // Back to login link
    const backToLoginLink = document.querySelector('.back-to-login-link');
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.switchToLogin();
        });
    }
}

function validatePasswordStrength() {
    const password = document.querySelector('.password-input').value;
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    // Password requirements
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Update requirement icons
    Object.keys(requirements).forEach(req => {
        const reqElement = document.getElementById(`req-${req}`);
        if (reqElement) {
            if (requirements[req]) {
                reqElement.classList.add('met');
                reqElement.querySelector('.requirement-icon').textContent = '✅';
            } else {
                reqElement.classList.remove('met');
                reqElement.querySelector('.requirement-icon').textContent = '⭕';
            }
        }
    });
    
    // Calculate strength
    const metCount = Object.values(requirements).filter(Boolean).length;
    const strength = (metCount / 5) * 100;
    
    // Update strength bar
    if (strengthFill) {
        strengthFill.style.width = strength + '%';
        
        if (strength <= 20) {
            strengthFill.className = 'strength-fill bg-red-500';
            strengthText.textContent = 'Very Weak';
        } else if (strength <= 40) {
            strengthFill.className = 'strength-fill bg-orange-500';
            strengthText.textContent = 'Weak';
        } else if (strength <= 60) {
            strengthFill.className = 'strength-fill bg-yellow-500';
            strengthText.textContent = 'Fair';
        } else if (strength <= 80) {
            strengthFill.className = 'strength-fill bg-blue-500';
            strengthText.textContent = 'Good';
        } else {
            strengthFill.className = 'strength-fill bg-green-500';
            strengthText.textContent = 'Strong';
        }
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'protonmail.com'];
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    
    const domain = email.split('@')[1];
    if (!commonDomains.includes(domain)) {
        return { valid: false, message: 'Please use a common email provider' };
    }
    
    return { valid: true, message: 'Email is valid' };
}

async function handleSignup() {
    const firstName = document.querySelector('.firstname-input').value;
    const lastName = document.querySelector('.lastname-input').value;
    const username = document.querySelector('.username-input').value;
    const email = document.querySelector('.email-input').value;
    const password = document.querySelector('.password-input').value;
    const confirmPassword = document.querySelector('.confirm-password-input').value;
    
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
        showMessage(emailValidation.message, 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Check password requirements
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const metCount = Object.values(requirements).filter(Boolean).length;
    if (metCount < 3) {
        showMessage('Please meet at least 3 password requirements', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.signin-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    try {
        // Call backend API for registration
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
            // Registration successful
            showMessage('Account created successfully! Welcome to ZenPose!', 'success');
            
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
            }, 2000);
            
        } else {
            // Registration failed
            showMessage(data.detail || 'Registration failed. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('Network error. Please check your connection.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function handleSocialSignup(provider) {
    console.log(`Social signup with ${provider}`);
    showMessage(`${provider} signup will be implemented here`, 'info');
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
