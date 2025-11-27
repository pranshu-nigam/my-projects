import toast from './Toast.js';
import { createZenPoseLogo } from './ZenPoseLogo.js';

export function renderDashboard(app) {
    // Clean up any existing modals before rendering
    const existingModals = document.querySelectorAll('.password-modal');
    existingModals.forEach(modal => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    });
    
    // Set current page to dashboard
    localStorage.setItem('zenpose_current_page', 'dashboard');
    
    app.innerHTML = `
        <div class="dashboard">
            <!-- Floating particles/petals -->
            <div class="floating-petal-1">🌸</div>
            <div class="floating-petal-2">🌿</div>
            <div class="floating-petal-3">🌸</div>
            <div class="floating-petal-4">🌺</div>
            <div class="floating-lotus-1">🌸</div>
            <div class="floating-lotus-2">🌸</div>
            <div class="floating-sparkle-1">✨</div>
            <div class="floating-sparkle-2">✨</div>
            <div class="floating-sparkle-3">✨</div>
            <div class="breathing-circle-1"></div>
            <div class="breathing-circle-2"></div>
            <!-- Top Navigation Bar -->
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo-section">
                        <div class="logo-circle zenpose-logo" id="dashboard-logo">
                            <!-- ZenPose logo will be inserted here -->
                        </div>
                        <h1 class="brand-name">ZenPose</h1>
                    </div>
                </div>
                
                <div class="nav-center">
                    <div class="greeting-section">
                        <h2 class="greeting-text">Good Morning, <span id="userName">Pranshu</span> 🌞</h2>
                        <p class="current-date" id="currentDate">Loading...</p>
                    </div>
                </div>
                
                <div class="nav-right">
                    <button class="theme-toggle-btn" id="dashboardThemeToggleBtn">
                        <div class="theme-icon">🌙</div>
                    </button>
                    <div class="user-menu" id="userMenu">
                        <div class="user-avatar">👤</div>
                        <div class="user-info">
                            <span class="user-name" id="navUserName">Pranshu</span>
                            <span class="user-level" id="navUserLevel">Zen Master 🌸</span>
                        </div>
                        <button class="menu-toggle">▼</button>
                        
                        <div class="user-dropdown" id="userDropdown">
                            <div class="dropdown-item" id="profileBtn">
                                <span class="dropdown-icon">👤</span>
                                <span>Profile</span>
                            </div>
                            <div class="dropdown-item" id="settingsBtn">
                                <span class="dropdown-icon">⚙️</span>
                                <span>Settings</span>
                            </div>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item logout-item" id="logoutBtn">
                                <span class="dropdown-icon">🚪</span>
                                <span>Logout</span>
                            </div>
                            <div class="dropdown-item delete-item" id="deleteAccountBtn">
                                <span class="dropdown-icon">🗑️</span>
                                <span>Delete Account</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Main Dashboard Content -->
            <main class="dashboard-main">
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="hero-content">
                        <div class="quote-card">
                            <div class="quote-icon">💭</div>
                            <blockquote class="daily-quote">
                                "Breathe. Relax. Let go."
                            </blockquote>
                            <p class="quote-author">- Daily Wisdom</p>
                        </div>
                        <div class="hero-actions">
                            <button class="start-session-btn primary-btn" id="startSessionBtn">
                                <span class="btn-icon">🧘‍♀️</span>
                                <span class="btn-text">Start Session</span>
                            </button>
                            <button class="quick-meditation-btn secondary-btn" id="quickMeditationBtn">
                                <span class="btn-icon">🌿</span>
                                <span class="btn-text">5-min Breathing</span>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Stats Overview -->
                <section class="stats-overview">
                    <div class="stat-card">
                        <div class="stat-icon">🔥</div>
                        <div class="stat-content">
                            <h3>Calories Burned</h3>
                            <div class="stat-number">127</div>
                            <p>Today</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <h3>Meditation Time</h3>
                            <div class="stat-number">45m</div>
                            <p>This week</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🌿</div>
                        <div class="stat-content">
                            <h3>Stress Level</h3>
                            <div class="stress-meter">
                                <div class="meter-fill" style="width: 30%"></div>
                            </div>
                            <p>Low Stress</p>
                        </div>
                    </div>
                    <div class="stat-card streak-card">
                        <div class="stat-icon">🌸</div>
                        <div class="stat-content">
                            <h3>Current Streak</h3>
                            <div class="stat-number">5</div>
                            <p>Days in a Row</p>
                        </div>
                    </div>
                </section>

                <!-- Main Content Grid -->
                <div class="dashboard-grid">
                    <!-- Today's Class Card -->
                    <section class="dashboard-card today-class-card">
                        <div class="card-header">
                            <h3 class="card-title">Today's Class</h3>
                            <div class="class-time">
                                <span class="time-icon">⏰</span>
                                <span class="time-text">7:00 AM</span>
                            </div>
                        </div>
                        <div class="class-content">
                            <div class="class-info">
                                <h4 class="class-name">Yoga for Flexibility</h4>
                                <p class="class-description">Enhance your flexibility with gentle stretches and mindful movements</p>
                                <div class="class-meta">
                                    <span class="class-duration">45 min</span>
                                    <span class="class-level">Intermediate</span>
                                    <span class="class-instructor">with Sarah</span>
                                </div>
                            </div>
                            <button class="join-class-btn" id="joinClassBtn">
                                <span class="btn-icon">🎯</span>
                                <span class="btn-text">Join Now</span>
                            </button>
                        </div>
                    </section>

                    <!-- Progress Chart Card -->
                    <section class="dashboard-card progress-card">
                        <div class="card-header">
                            <h3 class="card-title">Weekly Progress</h3>
                            <span class="card-subtitle">Your practice this week</span>
                        </div>
                        <div class="progress-chart">
                            <div class="chart-bars">
                                <div class="chart-bar">
                                    <div class="bar-fill" style="height: 60%"></div>
                                    <span class="bar-label">Mon</span>
                                    <span class="bar-value">30m</span>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style="height: 80%"></div>
                                    <span class="bar-label">Tue</span>
                                    <span class="bar-value">45m</span>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style="height: 40%"></div>
                                    <span class="bar-label">Wed</span>
                                    <span class="bar-value">20m</span>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style="height: 100%"></div>
                                    <span class="bar-label">Thu</span>
                                    <span class="bar-value">60m</span>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style="height: 70%"></div>
                                    <span class="bar-label">Fri</span>
                                    <span class="bar-value">35m</span>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style="height: 90%"></div>
                                    <span class="bar-label">Sat</span>
                                    <span class="bar-value">50m</span>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style="height: 75%"></div>
                                    <span class="bar-label">Sun</span>
                                    <span class="bar-value">40m</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Recommended Flows -->
                <section class="recommended-flows">
                    <h3 class="section-title">Recommended for You</h3>
                    <div class="flows-carousel">
                        <div class="flow-card">
                            <div class="flow-image">
                                <div class="flow-icon">🌅</div>
                            </div>
                            <div class="flow-content">
                                <h4>Morning Flow</h4>
                                <p>Energize your day with gentle stretches</p>
                                <div class="flow-meta">
                                    <span class="flow-duration">20 min</span>
                                    <span class="flow-level">Beginner</span>
                                </div>
                                <button class="flow-btn">Start</button>
                            </div>
                        </div>
                        
                        <div class="flow-card">
                            <div class="flow-image">
                                <div class="flow-icon">🌙</div>
                            </div>
                            <div class="flow-content">
                                <h4>Evening Relaxation</h4>
                                <p>Wind down with calming poses</p>
                                <div class="flow-meta">
                                    <span class="flow-duration">30 min</span>
                                    <span class="flow-level">All Levels</span>
                                </div>
                                <button class="flow-btn">Start</button>
                            </div>
                        </div>
                        
                        <div class="flow-card">
                            <div class="flow-image">
                                <div class="flow-icon">🧘‍♀️</div>
                            </div>
                            <div class="flow-content">
                                <h4>Mindful Meditation</h4>
                                <p>Deep breathing and mindfulness</p>
                                <div class="flow-meta">
                                    <span class="flow-duration">15 min</span>
                                    <span class="flow-level">All Levels</span>
                                </div>
                                <button class="flow-btn">Start</button>
                            </div>
                        </div>
                        
                        <div class="flow-card">
                            <div class="flow-image">
                                <div class="flow-icon">💪</div>
                            </div>
                            <div class="flow-content">
                                <h4>Strength Building</h4>
                                <p>Build core strength and stability</p>
                                <div class="flow-meta">
                                    <span class="flow-duration">40 min</span>
                                    <span class="flow-level">Intermediate</span>
                                </div>
                                <button class="flow-btn">Start</button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Community Section -->
                <section class="community-section">
                    <h3 class="section-title">Community Highlights</h3>
                    <div class="community-posts">
                        <div class="community-post">
                            <div class="post-header">
                                <div class="post-avatar">🧘‍♀️</div>
                                <div class="post-info">
                                    <h4>Sarah M.</h4>
                                    <span class="post-time">2 hours ago</span>
                                </div>
                                <div class="post-actions">
                                    <button class="like-btn">❤️ 24</button>
                                    <button class="comment-btn">💬 8</button>
                                </div>
                            </div>
                            <div class="post-content">
                                <p>Just completed my 100th session! 🎉 The journey has been incredible. Remember, every pose is progress, no matter how small! #YogaJourney #100Sessions</p>
                            </div>
                        </div>
                        
                        <div class="community-post">
                            <div class="post-header">
                                <div class="post-avatar">🌅</div>
                                <div class="post-info">
                                    <h4>Mike R.</h4>
                                    <span class="post-time">5 hours ago</span>
                                </div>
                                <div class="post-actions">
                                    <button class="like-btn">❤️ 18</button>
                                    <button class="comment-btn">💬 12</button>
                                </div>
                            </div>
                            <div class="post-content">
                                <p>Morning flow in the garden today! 🌸 Nothing beats starting the day with some sun salutations. What's your favorite morning routine? #MorningYoga #SunSalutation</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <!-- Left Sidebar -->
            <aside class="dashboard-sidebar">
                <nav class="sidebar-nav">
                    <a href="#" class="sidebar-item active" data-section="home">
                        <span class="sidebar-icon">🏠</span>
                        <span class="sidebar-label">Home</span>
                    </a>
                    <a href="#" class="sidebar-item" data-section="classes">
                        <span class="sidebar-icon">📚</span>
                        <span class="sidebar-label">Classes</span>
                    </a>
                    <a href="#" class="sidebar-item" data-section="progress">
                        <span class="sidebar-icon">📊</span>
                        <span class="sidebar-label">Progress</span>
                    </a>
                    <a href="#" class="sidebar-item" data-section="ai-pose">
                        <span class="sidebar-icon">🤖</span>
                        <span class="sidebar-label">AI Pose</span>
                    </a>
                </nav>
            </aside>
        </div>
    `;

    setupDashboardEvents();
    updateCurrentDate();
    
    // Initialize ZenPose logo with consistent size
    setTimeout(() => {
        const logoContainer = document.querySelector('#dashboard-logo');
        if (logoContainer) {
            // Clear any existing content
            logoContainer.innerHTML = '';
            const zenposeLogo = createZenPoseLogo('w-12 h-12');
            logoContainer.appendChild(zenposeLogo);
        }
    }, 0);
}

function setupDashboardEvents() {
    // Theme toggle
    const dashboardThemeToggleBtn = document.getElementById('dashboardThemeToggleBtn');
    if (dashboardThemeToggleBtn) {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('zenpose_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            dashboardThemeToggleBtn.querySelector('.theme-icon').textContent = '☀️';
        }
        
        dashboardThemeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            // Save theme preference
            localStorage.setItem('zenpose_theme', isDark ? 'dark' : 'light');
            
            // Update icon
            dashboardThemeToggleBtn.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
            
            // Show notification
            toast.info(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'Theme Changed');
        });
    }
    
    // User menu dropdown
    const userMenu = document.getElementById('userMenu');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenu && userDropdown) {
        userMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', () => {
            userDropdown.classList.remove('show');
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Close dropdown
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) {
                userDropdown.classList.remove('show');
            }
            
            // Show logout confirmation modal
            showLogoutConfirmation();
        });
    }
    
    // Delete account functionality
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            showDeleteAccountModal();
        });
    }

    function showDeleteAccountModal() {
        // Remove any existing modals first
        const existingModals = document.querySelectorAll('.password-modal');
        existingModals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });

        // Create the password confirmation modal
        const modal = document.createElement('div');
        modal.className = 'password-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-icon">🗑️</div>
                    <h3 class="modal-title">Delete Account</h3>
                    <p class="modal-subtitle">This action cannot be undone</p>
                </div>
                
                <div class="modal-body">
                    <div class="warning-message">
                        <div class="warning-icon">⚠️</div>
                        <div class="warning-text">
                            <strong>Warning:</strong> Deleting your account will permanently remove all your data, progress, and sessions. This action cannot be reversed.
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="deletePassword" class="form-label">Enter your password to confirm</label>
                        <input type="password" id="deletePassword" class="form-input" placeholder="Enter your password">
                        <div class="input-helper">
                            <span class="helper-text">Type your password to confirm account deletion</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="modal-btn modal-btn-cancel" id="cancelDeleteBtn">Cancel</button>
                    <button class="modal-btn modal-btn-delete" id="confirmDeleteBtn" disabled>Delete Account</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Setup modal event listeners
        setupDeleteModalEvents(modal);
    }

    function setupDeleteModalEvents(modal) {
        const passwordInput = modal.querySelector('#deletePassword');
        const confirmBtn = modal.querySelector('#confirmDeleteBtn');
        const cancelBtn = modal.querySelector('#cancelDeleteBtn');
        const backdrop = modal.querySelector('.modal-backdrop');

        // Enable/disable confirm button based on password input
        passwordInput.addEventListener('input', (e) => {
            const hasPassword = e.target.value.trim().length > 0;
            confirmBtn.disabled = !hasPassword;
            
            if (hasPassword) {
                confirmBtn.classList.add('enabled');
            } else {
                confirmBtn.classList.remove('enabled');
            }
        });

        // Handle password submission
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !confirmBtn.disabled) {
                handleDeleteAccount(passwordInput.value, modal);
            }
        });

        // Confirm delete button
        confirmBtn.addEventListener('click', () => {
            if (!confirmBtn.disabled) {
                handleDeleteAccount(passwordInput.value, modal);
            }
        });

        // Cancel button
        cancelBtn.addEventListener('click', () => {
            closeDeleteModal(modal);
            toast.actionCancelled('Account deletion');
        });

        // Close on backdrop click
        backdrop.addEventListener('click', () => {
            closeDeleteModal(modal);
            toast.actionCancelled('Account deletion');
        });

        // Close on escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeDeleteModal(modal);
                toast.actionCancelled('Account deletion');
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    async function handleDeleteAccount(password, modal) {
        const confirmBtn = modal.querySelector('#confirmDeleteBtn');
        const passwordInput = modal.querySelector('#deletePassword');
        
        // Show loading state
        confirmBtn.innerHTML = '<span class="loading-spinner"></span> Verifying...';
        confirmBtn.disabled = true;
        passwordInput.disabled = true;

        try {
            // Get user token
            const token = localStorage.getItem('zenpose_user_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Call delete account API
            const response = await fetch('http://localhost:3000/auth/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (response.ok) {
                // Success - close modal and show success message
                closeDeleteModal(modal);
                toast.accountDeleted();
                
                // Clear all user data and redirect
                setTimeout(() => {
                    localStorage.removeItem('zenpose_user');
                    localStorage.removeItem('zenpose_user_token');
                    localStorage.removeItem('zenpose_current_page');
                    localStorage.removeItem('zenpose_just_logged_in');
                    window.location.reload();
                }, 2000);
            } else {
                // Error - show error message
                throw new Error(data.message || 'Failed to delete account');
            }
        } catch (error) {
            // Reset button state
            confirmBtn.innerHTML = 'Delete Account';
            confirmBtn.disabled = false;
            passwordInput.disabled = false;
            passwordInput.value = '';
            
            // Show error message
            toast.error(error.message || 'Failed to delete account. Please try again.', 'Delete Failed');
        }
    }

    function closeDeleteModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // Profile functionality
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            // Close dropdown
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) {
                userDropdown.classList.remove('show');
            }
            
            // Navigate to profile page
            import('./Profile.js').then(module => {
                module.renderProfile(document.getElementById('app'));
            });
        });
    }

    // Settings navigation
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            // Close dropdown
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) {
                userDropdown.classList.remove('show');
            }
            
            // Navigate to settings page
            import('./Settings.js').then(module => {
                module.renderSettings(document.getElementById('app'));
            });
        });
    }
    
    // Start session button
    const startSessionBtn = document.getElementById('startSessionBtn');
    if (startSessionBtn) {
        startSessionBtn.addEventListener('click', () => {
            toast.show('Starting your yoga session...', 'success');
        });
    }
    
    // Quick meditation button
    const quickMeditationBtn = document.getElementById('quickMeditationBtn');
    if (quickMeditationBtn) {
        quickMeditationBtn.addEventListener('click', () => {
            toast.show('Starting 5-minute breathing session...', 'success');
        });
    }
    
    // Join class button
    const joinClassBtn = document.getElementById('joinClassBtn');
    if (joinClassBtn) {
        joinClassBtn.addEventListener('click', () => {
            toast.show('Joining Yoga for Flexibility class...', 'success');
        });
    }
    
    // Flow buttons
    const flowBtns = document.querySelectorAll('.flow-btn');
    flowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const flowName = e.target.closest('.flow-card').querySelector('h4').textContent;
            toast.show(`Starting ${flowName}...`, 'success');
        });
    });
    
    // Sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            const section = item.getAttribute('data-section');
            
            if (section === 'classes') {
                import('./Classes.js').then(module => {
                    module.renderClasses(document.getElementById('app'));
                });
            } else if (section === 'progress') {
                import('./Progress.js').then(module => {
                    module.renderProgress(document.getElementById('app'));
                });
            } else if (section === 'ai-pose') {
                localStorage.setItem('zenpose_current_page', 'ai-pose');
                window.location.reload();
            } else if (section === 'settings') {
                import('./Settings.js').then(module => {
                    module.renderSettings(document.getElementById('app'));
                });
            } else {
                toast.show(`Navigating to ${section}...`, 'info');
            }
        });
    });
    
    // Community interaction buttons
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLikes = btn.textContent.match(/\d+/)[0];
            const newLikes = parseInt(currentLikes) + 1;
            btn.textContent = `❤️ ${newLikes}`;
            toast.show('Post liked!', 'success');
        });
    });
    
    const commentBtns = document.querySelectorAll('.comment-btn');
    commentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toast.show('Comment feature coming soon!', 'info');
        });
    });
    

    
    // Load user data
    loadUserData();
}

function loadUserData() {
    const user = JSON.parse(localStorage.getItem('zenpose_user') || '{}');
    
    // Update user name in various places
    const userNameElements = document.querySelectorAll('#userName, #navUserName');
    userNameElements.forEach(element => {
        if (element && user.username) {
            element.textContent = user.username;
        }
    });
    
    // Update user level
    const userLevelElements = document.querySelectorAll('#navUserLevel');
    userLevelElements.forEach(element => {
        if (element && user.level) {
            element.textContent = user.level;
        }
    });
}

function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Logout confirmation modal
function showLogoutConfirmation() {
    // Remove any existing modals
    const existingModal = document.querySelector('.logout-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'logout-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="logout-modal">
            <div class="logout-modal-header">
                <div class="logout-modal-icon">🚪</div>
                <h3 class="logout-modal-title">Confirm Logout</h3>
            </div>
            <div class="logout-modal-content">
                <p class="logout-modal-message">Are you sure you want to logout? You'll need to sign in again to access your account.</p>
            </div>
            <div class="logout-modal-actions">
                <button class="logout-modal-btn cancel-btn" id="cancelLogoutBtn">
                    <span class="btn-icon">❌</span>
                    <span>Cancel</span>
                </button>
                <button class="logout-modal-btn confirm-btn" id="confirmLogoutBtn">
                    <span class="btn-icon">✅</span>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    `;

    // Add to body
    document.body.appendChild(modalOverlay);

    // Add animation
    setTimeout(() => {
        modalOverlay.classList.add('show');
    }, 10);

    // Event listeners
    const cancelBtn = document.getElementById('cancelLogoutBtn');
    const confirmBtn = document.getElementById('confirmLogoutBtn');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            closeLogoutModal(modalOverlay);
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            closeLogoutModal(modalOverlay);
            // Show logout success notification
            toast.logoutSuccess();
            setTimeout(() => {
                localStorage.removeItem('zenpose_user');
                localStorage.removeItem('zenpose_user_token');
                localStorage.removeItem('zenpose_current_page');
                localStorage.removeItem('zenpose_just_logged_in');
                window.location.reload();
            }, 2000);
        });
    }

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeLogoutModal(modalOverlay);
        }
    });

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeLogoutModal(modalOverlay);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function closeLogoutModal(modalOverlay) {
    modalOverlay.classList.remove('show');
    setTimeout(() => {
        if (modalOverlay.parentNode) {
            modalOverlay.parentNode.removeChild(modalOverlay);
        }
    }, 300);
}

// AI Pose Detection functionality
async function startAIPoseDetection() {
    // Show loading state
    const aiPoseBtn = document.getElementById('aiPoseBtn');
    if (aiPoseBtn) {
        const originalText = aiPoseBtn.querySelector('.ai-btn-text').textContent;
        aiPoseBtn.querySelector('.ai-btn-text').textContent = 'Starting AI...';
        aiPoseBtn.disabled = true;
        aiPoseBtn.classList.add('ai-loading');
        
        // Show initial notification
        toast.show('Initializing AI pose detection...', 'info');
        
        try {
            // Get user token
            const token = localStorage.getItem('zenpose_user_token');
            if (!token) {
                throw new Error('Please log in first to use AI features');
            }
            
            // Check if user data exists
            const user = localStorage.getItem('zenpose_user');
            if (!user) {
                throw new Error('User session expired. Please log in again');
            }

            // Call backend API to initialize AI pose detection
            const response = await fetch('http://localhost:3000/ai/pose-detection/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Reset button state
                aiPoseBtn.querySelector('.ai-btn-text').textContent = originalText;
                aiPoseBtn.disabled = false;
                aiPoseBtn.classList.remove('ai-loading');
                
                // Show success notification
                toast.show('AI pose detection ready! Camera access required.', 'success');
                
                // Show AI pose modal with backend data
                showAIPoseModal(data);
            } else {
                throw new Error(data.detail || 'Failed to initialize AI pose detection');
            }
        } catch (error) {
            // Reset button state
            aiPoseBtn.querySelector('.ai-btn-text').textContent = originalText;
            aiPoseBtn.disabled = false;
            aiPoseBtn.classList.remove('ai-loading');
            
            // Show error notification
            toast.error(error.message || 'Failed to initialize AI pose detection', 'AI Error');
        }
    }
}

function showAIPoseModal(aiData = null) {
    // Create AI pose detection modal
    const modal = document.createElement('div');
    modal.className = 'ai-pose-modal';
    
    // Use backend data if available, otherwise use defaults
    const features = aiData?.features || [
        "Real-time pose analysis",
        "Accuracy scoring", 
        "Improvement suggestions"
    ];
    
    const supportedPoses = aiData?.supported_poses || [
        "Downward Dog",
        "Warrior I",
        "Tree Pose"
    ];
    
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content ai-modal-content">
            <div class="modal-header">
                <div class="modal-icon ai-icon">🤖</div>
                <h3 class="modal-title">AI Pose Detection</h3>
                <p class="modal-subtitle">Get real-time feedback on your yoga poses</p>
                ${aiData ? `<div class="session-info">Session: ${aiData.session_id}</div>` : ''}
            </div>
            
            <div class="modal-body">
                <div class="ai-camera-section">
                    <div class="camera-placeholder">
                        <div class="camera-icon">📹</div>
                        <p>Camera will be activated here</p>
                        <div class="ai-status">
                            <span class="status-dot"></span>
                            <span class="status-text">${aiData?.status || 'Ready to analyze'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="ai-features">
                    ${features.map(feature => `
                        <div class="feature-item">
                            <span class="feature-icon">🎯</span>
                            <span class="feature-text">${feature}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="supported-poses">
                    <h4 class="poses-title">Supported Poses</h4>
                    <div class="poses-grid">
                        ${supportedPoses.map(pose => `
                            <div class="pose-item">
                                <span class="pose-icon">🧘‍♀️</span>
                                <span class="pose-name">${pose}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="modal-btn modal-btn-cancel" id="cancelAIBtn">Cancel</button>
                <button class="modal-btn modal-btn-primary" id="startCameraBtn">
                    <span class="btn-icon">📹</span>
                    <span>Start Camera</span>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Setup modal event listeners
    setupAIModalEvents(modal);
}

function setupAIModalEvents(modal) {
    const cancelBtn = modal.querySelector('#cancelAIBtn');
    const startCameraBtn = modal.querySelector('#startCameraBtn');
    const backdrop = modal.querySelector('.modal-backdrop');

    // Cancel button
    cancelBtn.addEventListener('click', () => {
        closeAIModal(modal);
    });

    // Start camera button
    startCameraBtn.addEventListener('click', async () => {
        try {
            // Show loading state
            startCameraBtn.innerHTML = '<span class="loading-spinner"></span> Starting...';
            startCameraBtn.disabled = true;
            
            // Get user token
            const token = localStorage.getItem('zenpose_user_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Call backend API to get AI status
            const response = await fetch('http://localhost:3000/ai/pose-detection/status', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Show success notification
                toast.show('AI pose detection is ready! Your AI model is now active.', 'success');
                
                // Here you would integrate with your actual AI model
                // For now, we'll show a placeholder message
                setTimeout(() => {
                    toast.show('AI model integration coming soon! Camera access will be implemented next.', 'info');
                    closeAIModal(modal);
                }, 1500);
            } else {
                throw new Error(data.detail || 'Failed to get AI status');
            }
        } catch (error) {
            // Reset button state
            startCameraBtn.innerHTML = '<span class="btn-icon">📹</span><span>Start Camera</span>';
            startCameraBtn.disabled = false;
            
            // Show error notification
            toast.error(error.message || 'Failed to start AI pose detection', 'AI Error');
        }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', () => {
        closeAIModal(modal);
    });

    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeAIModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function closeAIModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}