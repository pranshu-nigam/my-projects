export function createRightPanel() {
    const rightPanel = document.createElement('div');
    rightPanel.className = 'right-panel';
    
    rightPanel.innerHTML = `
        <div class="right-content">
            <div class="form-header">
                <h2 class="form-title">Sign in to your account</h2>
                <p class="account-status">
                    Don't have an account? 
                    <a href="#" class="signup-link">Sign up here</a>
                </p>
            </div>
            
            <form class="login-form">
                <div class="form-group">
                    <label for="email" class="form-label">Username or Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        class="form-input email-input" 
                        placeholder="Enter your username or email"
                        required
                    >
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <div class="password-container">
                        <input 
                            type="password" 
                            id="password" 
                            class="form-input password-input" 
                            placeholder="Enter your password"
                            required
                        >
                        <button type="button" class="password-toggle">👁️</button>
                    </div>
                </div>
                
                <button type="submit" class="signin-btn">Sign In</button>
            </form>
            
            <div class="divider">
                <span class="divider-text">Or continue with</span>
            </div>
            
            <div class="social-buttons">
                <button class="social-btn google-btn">
                    <span class="social-icon">G</span>
                    <span class="social-text">Google</span>
                </button>
                <button class="social-btn apple-btn">
                    <span class="social-icon">🍎</span>
                    <span class="social-text">Apple</span>
                </button>
            </div>
            
            <div class="forgot-password">
                <a href="#" class="forgot-link">Forgot your password?</a>
            </div>
        </div>
    `;
    
    return rightPanel;
}
