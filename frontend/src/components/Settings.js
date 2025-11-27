import toast from './Toast.js';
import { createZenPoseLogo } from './ZenPoseLogo.js';

export function renderSettings(app) {
    try {
        // Set current page to settings
        localStorage.setItem('zenpose_current_page', 'settings');
        
        // Clear any existing content and show loading state
        if (app) {
            app.innerHTML = '<div class="loading-message">Loading Settings...</div>';
        }
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            renderSettingsContent(app);
        }, 50);
        
    } catch (error) {
        console.error('Error rendering Settings page:', error);
        if (app) {
            app.innerHTML = '<div class="error-message">Failed to load Settings page. Please try again.</div>';
        }
    }
}

function renderSettingsContent(app) {
    try {
        app.innerHTML = `
        <div class="dashboard">
            <!-- Top Navigation Bar -->
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo-section">
                        <div class="logo-circle zenpose-logo" id="settings-logo">
                            <!-- ZenPose logo will be inserted here -->
                        </div>
                        <h1 class="brand-name">ZenPose</h1>
                    </div>
                </div>
                
                <div class="nav-center">
                    <div class="greeting-section">
                        <h2 class="greeting-text">Settings <span class="nav-emoji">⚙️</span></h2>
                        <p class="current-date" id="currentDate">Customize your experience</p>
                    </div>
                </div>
                
                <div class="nav-right">
                    <button class="theme-toggle-btn" id="dashboardThemeToggleBtn">
                        <div class="theme-icon">🌙</div>
                    </button>
                    <div class="user-menu" id="userMenu">
                        <div class="user-avatar">👤</div>
                        <div class="user-info">
                            <span class="user-name" id="navUserName">User</span>
                            <span class="user-level" id="navUserLevel">Yogi 🌸</span>
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

            <!-- Left Sidebar -->
            <aside class="dashboard-sidebar">
                <nav class="sidebar-nav">
                    <a href="#" class="sidebar-item" data-section="home">
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

            <!-- Main Content -->
            <main class="dashboard-main">
                <div class="settings-container">
                    <!-- Back Button -->
                    <div class="settings-back-btn" id="backToDashboard">
                        <div class="back-icon">←</div>
                        <span>Back to Dashboard</span>
                    </div>
                    
                    <!-- Settings Header -->
                    <div class="settings-header">
                        <div class="settings-title-section">
                            <h1 class="settings-main-title">Settings</h1>
                            <p class="settings-subtitle">Customize your ZenPose experience</p>
                        </div>
                    </div>

                    <!-- Settings Tabs -->
                    <div class="settings-tabs">
                        <button class="tab-btn active" data-tab="general">
                            <span class="tab-icon">⚙️</span>
                            <span class="tab-label">General</span>
                        </button>
                        <button class="tab-btn" data-tab="notifications">
                            <span class="tab-icon">🔔</span>
                            <span class="tab-label">Notifications</span>
                        </button>
                        <button class="tab-btn" data-tab="preferences">
                            <span class="tab-icon">🎨</span>
                            <span class="tab-label">Preferences</span>
                        </button>
                    </div>

                    <!-- Settings Content -->
                    <div class="settings-content">
                        <!-- General Tab -->
                        <div class="tab-content active" id="general-tab">
                            <div class="settings-section">
                                <h2 class="section-title">Profile & Personalization</h2>
                                
                                <!-- Profile Picture -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Profile Picture</h3>
                                        <p class="setting-description">Change your profile picture</p>
                                    </div>
                                    <div class="profile-picture-container">
                                        <div class="profile-picture" id="profilePicture">
                                            <div class="profile-avatar">👤</div>
                                            <div class="change-overlay">
                                                <span class="change-icon">📷</span>
                                            </div>
                                        </div>
                                        <input type="file" id="profilePictureInput" accept="image/*" style="display: none;">
                                    </div>
                                </div>

                                <!-- Theme Toggle -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Theme</h3>
                                        <p class="setting-description">Choose your preferred theme</p>
                                    </div>
                                    <div class="theme-toggle-container">
                                        <div class="theme-toggle" id="settingsThemeToggle">
                                            <div class="toggle-track">
                                                <div class="toggle-thumb">
                                                    <span class="toggle-icon">🌙</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span class="theme-label">Dark Mode</span>
                                    </div>
                                </div>

                                <!-- Accent Color Picker -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Accent Color</h3>
                                        <p class="setting-description">Choose your accent color</p>
                                    </div>
                                    <div class="color-picker">
                                        <div class="color-option active" data-color="teal" style="background: #4DB6AC;"></div>
                                        <div class="color-option" data-color="purple" style="background: #8b5cf6;"></div>
                                        <div class="color-option" data-color="blue" style="background: #3b82f6;"></div>
                                        <div class="color-option" data-color="green" style="background: #10b981;"></div>
                                        <div class="color-option" data-color="pink" style="background: #ec4899;"></div>
                                        <div class="color-option" data-color="orange" style="background: #f59e0b;"></div>
                                    </div>
                                </div>

                                <!-- Language Selection -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Language</h3>
                                        <p class="setting-description">Select your preferred language</p>
                                    </div>
                                    <div class="dropdown-container">
                                        <select class="language-select" id="languageSelect">
                                            <option value="en">English</option>
                                            <option value="es">Español</option>
                                            <option value="fr">Français</option>
                                            <option value="de">Deutsch</option>
                                            <option value="ja">日本語</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Notifications Tab -->
                        <div class="tab-content" id="notifications-tab">
                            <div class="settings-section">
                                <h2 class="section-title">Notification Settings</h2>
                                
                                <!-- Class Reminders -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Class Reminders</h3>
                                        <p class="setting-description">Get notified before your classes start</p>
                                    </div>
                                    <div class="toggle-container">
                                        <div class="toggle-switch" id="classRemindersToggle">
                                            <div class="toggle-track">
                                                <div class="toggle-thumb">
                                                    <span class="toggle-icon">🔔</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Streak Celebrations -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Streak Celebrations</h3>
                                        <p class="setting-description">Celebrate your achievements with confetti</p>
                                    </div>
                                    <div class="toggle-container">
                                        <div class="toggle-switch" id="streakCelebrationsToggle">
                                            <div class="toggle-track">
                                                <div class="toggle-thumb">
                                                    <span class="toggle-icon">🎉</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Daily Motivation -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Daily Motivation</h3>
                                        <p class="setting-description">Receive daily inspirational quotes</p>
                                    </div>
                                    <div class="toggle-container">
                                        <div class="toggle-switch" id="dailyMotivationToggle">
                                            <div class="toggle-track">
                                                <div class="toggle-thumb">
                                                    <span class="toggle-icon">☁️</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Progress Updates -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Progress Updates</h3>
                                        <p class="setting-description">Get notified about your progress milestones</p>
                                    </div>
                                    <div class="toggle-container">
                                        <div class="toggle-switch" id="progressUpdatesToggle">
                                            <div class="toggle-track">
                                                <div class="toggle-thumb">
                                                    <span class="toggle-icon">📊</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Preferences Tab -->
                        <div class="tab-content" id="preferences-tab">
                            <div class="settings-section">
                                <h2 class="section-title">App Preferences</h2>
                                
                                <!-- Sound Effects -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Sound Effects</h3>
                                        <p class="setting-description">Enable sound effects and notifications</p>
                                    </div>
                                    <div class="toggle-container">
                                        <div class="toggle-switch" id="soundEffectsToggle">
                                            <div class="toggle-track">
                                                <div class="toggle-thumb">
                                                    <span class="toggle-icon">🔊</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Background Music -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Background Music</h3>
                                        <p class="setting-description">Play ambient music during sessions</p>
                                    </div>
                                    <div class="volume-container">
                                        <div class="volume-slider">
                                            <input type="range" class="volume-range" id="volumeRange" min="0" max="100" value="50">
                                            <div class="volume-fill"></div>
                                        </div>
                                        <span class="volume-value" id="volumeValue">50%</span>
                                    </div>
                                </div>

                                <!-- Default Session Duration -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Default Session Duration</h3>
                                        <p class="setting-description">Set your preferred meditation session length</p>
                                    </div>
                                    <div class="duration-options">
                                        <button class="duration-btn" data-duration="5">5 min</button>
                                        <button class="duration-btn active" data-duration="10">10 min</button>
                                        <button class="duration-btn" data-duration="15">15 min</button>
                                        <button class="duration-btn" data-duration="20">20 min</button>
                                        <button class="duration-btn" data-duration="30">30 min</button>
                                    </div>
                                </div>

                                <!-- Animations -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Animations</h3>
                                        <p class="setting-description">Enable smooth animations and transitions</p>
                                    </div>
                                    <div class="toggle-container">
                                        <div class="toggle-switch" id="animationsToggle">
                                            <div class="toggle-track">
                                                <div class="toggle-thumb">
                                                    <span class="toggle-icon">✨</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Privacy & Data Section -->
                            <div class="settings-section">
                                <h2 class="section-title">Privacy & Data</h2>
                                
                                <!-- Community Visibility -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Community Visibility</h3>
                                        <p class="setting-description">Show your progress to the community</p>
                                    </div>
                                    <div class="toggle-container">
                                        <div class="toggle-switch" id="communityVisibilityToggle">
                                            <div class="toggle-track">
                                                <div class="toggle-thumb">
                                                    <span class="toggle-icon">🔓</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Data Export -->
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <h3 class="setting-title">Export Data</h3>
                                        <p class="setting-description">Download your progress and session data</p>
                                    </div>
                                    <button class="export-btn" id="exportDataBtn">
                                        <span class="export-icon">📥</span>
                                        <span class="export-text">Export Data</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;

        // Wait for DOM to be ready before setting up events
        setTimeout(() => {
            setupSettingsEvents();
            
            // Initialize ZenPose logo
            const logoContainer = document.querySelector('#settings-logo');
            if (logoContainer) {
                // Clear any existing content
                logoContainer.innerHTML = '';
                const zenposeLogo = createZenPoseLogo('w-12 h-12');
                logoContainer.appendChild(zenposeLogo);
            }
        }, 100);
        
    } catch (error) {
        console.error('Error rendering Settings content:', error);
        if (app) {
            app.innerHTML = '<div class="error-message">Failed to load Settings page. Please try again.</div>';
        }
    }
}

function setupSettingsEvents() {
    try {
        // Load user data
        const userData = JSON.parse(localStorage.getItem('zenpose_user') || '{}');
        const userName = userData.username || 'User';
        const userLevel = userData.level || 'Yogi';
        
        // Update navigation with user data
        const navUserName = document.getElementById('navUserName');
        const navUserLevel = document.getElementById('navUserLevel');
        if (navUserName) navUserName.textContent = userName;
        if (navUserLevel) navUserLevel.textContent = `${userLevel} 🌸`;
        
        // Update current date
        const currentDate = document.getElementById('currentDate');
        if (currentDate) {
            currentDate.textContent = new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

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

        // User dropdown
        const userMenu = document.getElementById('userMenu');
        const userDropdown = document.getElementById('userDropdown');
        if (userMenu && userDropdown) {
            userMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
            });
            
            document.addEventListener('click', () => {
                userDropdown.style.display = 'none';
            });
        }

        // Profile navigation
        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                import('./Profile.js').then(module => {
                    module.renderProfile(document.getElementById('app'));
                });
            });
        }

        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                showLogoutConfirmation();
            });
        }

        // Delete account functionality
        const deleteAccountBtn = document.getElementById('deleteAccountBtn');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => {
                import('./Dashboard.js').then(module => {
                    module.showDeleteAccountModal();
                });
            });
        }

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
                
                if (section === 'home') {
                    import('./Dashboard.js').then(module => {
                        module.renderDashboard(document.getElementById('app'));
                    });
                } else if (section === 'classes') {
                    import('./Classes.js').then(module => {
                        module.renderClasses(document.getElementById('app'));
                    });
                } else if (section === 'progress') {
                    import('./Progress.js').then(module => {
                        module.renderProgress(document.getElementById('app'));
                    });
                } else if (section === 'ai-pose') {
                    import('./AIPoseNew.js').then(module => {
                        module.renderAIPoseNew(document.getElementById('app'));
                    });
                }
            });
        });

        // Back to dashboard
        const backToDashboardBtn = document.getElementById('backToDashboard');
        if (backToDashboardBtn) {
            backToDashboardBtn.addEventListener('click', () => {
                try {
                    import('./Dashboard.js').then(module => {
                        module.renderDashboard(document.getElementById('app'));
                    }).catch(error => {
                        console.error('Error loading Dashboard:', error);
                        toast.error('Failed to load Dashboard. Please refresh the page.');
                    });
                } catch (error) {
                    console.error('Error navigating to Dashboard:', error);
                    toast.error('Navigation error. Please try again.');
                }
            });
        }

        // Settings-specific event handlers
        setupSettingsTabs();
        setupProfilePicture();
        setupThemeToggle();
        setupColorPicker();
        setupToggles();
        setupVolumeSlider();
        setupDurationButtons();
        setupExportButton();
        
    } catch (error) {
        console.error('Error setting up Settings events:', error);
    }
}

// Settings-specific functions
function setupSettingsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
            
            // Add animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function setupProfilePicture() {
    const profilePicture = document.getElementById('profilePicture');
    const profilePictureInput = document.getElementById('profilePictureInput');

    if (profilePicture && profilePictureInput) {
        profilePicture.addEventListener('click', () => {
            profilePictureInput.click();
        });

        profilePictureInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePicture.style.backgroundImage = `url(${e.target.result})`;
                    profilePicture.querySelector('.profile-avatar').style.display = 'none';
                    toast.success('Profile picture updated!', 'Success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function setupThemeToggle() {
    const settingsThemeToggle = document.getElementById('settingsThemeToggle');
    if (settingsThemeToggle) {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('zenpose_theme');
        const isDark = savedTheme === 'dark';
        
        if (isDark) {
            settingsThemeToggle.classList.add('active');
            settingsThemeToggle.querySelector('.toggle-icon').textContent = '☀️';
        }

        settingsThemeToggle.addEventListener('click', () => {
            const isActive = settingsThemeToggle.classList.contains('active');
            
            if (isActive) {
                settingsThemeToggle.classList.remove('active');
                settingsThemeToggle.querySelector('.toggle-icon').textContent = '🌙';
                document.body.classList.remove('dark-theme');
                localStorage.setItem('zenpose_theme', 'light');
            } else {
                settingsThemeToggle.classList.add('active');
                settingsThemeToggle.querySelector('.toggle-icon').textContent = '☀️';
                document.body.classList.add('dark-theme');
                localStorage.setItem('zenpose_theme', 'dark');
            }
            
            toast.info(isActive ? 'Light mode enabled' : 'Dark mode enabled', 'Theme Changed');
        });
    }
}

function setupColorPicker() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Get color value
            const color = option.getAttribute('data-color');
            
            // Apply color theme (you can implement this based on your needs)
            toast.success(`Accent color changed to ${color}`, 'Color Updated');
        });
    });
}

function setupToggles() {
    const toggles = document.querySelectorAll('.toggle-switch');
    
    toggles.forEach(toggle => {
        // Load saved state
        const toggleId = toggle.id;
        const savedState = localStorage.getItem(`zenpose_${toggleId}`);
        
        if (savedState === 'true') {
            toggle.classList.add('active');
        }

        toggle.addEventListener('click', () => {
            const isActive = toggle.classList.contains('active');
            
            if (isActive) {
                toggle.classList.remove('active');
                localStorage.setItem(`zenpose_${toggleId}`, 'false');
            } else {
                toggle.classList.add('active');
                localStorage.setItem(`zenpose_${toggleId}`, 'true');
                
                // Special animations for specific toggles
                if (toggleId === 'streakCelebrationsToggle') {
                    createConfettiBurst(toggle);
                } else if (toggleId === 'classRemindersToggle') {
                    animateBell(toggle);
                }
            }
            
            const settingName = toggleId.replace('Toggle', '').replace(/([A-Z])/g, ' $1').trim();
            toast.info(`${settingName} ${isActive ? 'disabled' : 'enabled'}`, 'Setting Updated');
        });
    });
}

function setupVolumeSlider() {
    const volumeRange = document.getElementById('volumeRange');
    const volumeValue = document.getElementById('volumeValue');
    const volumeFill = document.querySelector('.volume-fill');

    if (volumeRange && volumeValue && volumeFill) {
        // Load saved volume
        const savedVolume = localStorage.getItem('zenpose_volume') || '50';
        volumeRange.value = savedVolume;
        volumeValue.textContent = `${savedVolume}%`;
        volumeFill.style.width = `${savedVolume}%`;

        volumeRange.addEventListener('input', (e) => {
            const value = e.target.value;
            volumeValue.textContent = `${value}%`;
            volumeFill.style.width = `${value}%`;
            localStorage.setItem('zenpose_volume', value);
        });
    }
}

function setupDurationButtons() {
    const durationBtns = document.querySelectorAll('.duration-btn');
    
    // Load saved duration
    const savedDuration = localStorage.getItem('zenpose_default_duration') || '10';
    
    durationBtns.forEach(btn => {
        if (btn.getAttribute('data-duration') === savedDuration) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            durationBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const duration = btn.getAttribute('data-duration');
            localStorage.setItem('zenpose_default_duration', duration);
            
            // Animate the button
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            toast.success(`Default duration set to ${duration} minutes`, 'Duration Updated');
        });
    });
}

function setupExportButton() {
    const exportBtn = document.getElementById('exportDataBtn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Animate the button
            exportBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                exportBtn.style.transform = 'scale(1)';
            }, 150);
            
            // Simulate data export
            toast.info('Preparing your data for export...', 'Export Started');
            
            setTimeout(() => {
                // Create a mock data export
                const userData = JSON.parse(localStorage.getItem('zenpose_user') || '{}');
                const exportData = {
                    user: userData,
                    settings: {
                        theme: localStorage.getItem('zenpose_theme'),
                        volume: localStorage.getItem('zenpose_volume'),
                        defaultDuration: localStorage.getItem('zenpose_default_duration')
                    },
                    exportDate: new Date().toISOString()
                };
                
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = `zenpose-data-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                
                URL.revokeObjectURL(url);
                toast.success('Data exported successfully!', 'Export Complete');
            }, 2000);
        });
    }
}

// Animation functions
function createConfettiBurst(element) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-burst';
    
    for (let i = 0; i < 12; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.top = Math.random() * 100 + '%';
        piece.style.backgroundColor = ['#4DB6AC', '#8b5cf6', '#3b82f6', '#10b981', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 6)];
        confetti.appendChild(piece);
    }
    
    element.style.position = 'relative';
    element.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 1000);
}

function animateBell(element) {
    const bell = element.querySelector('.toggle-icon');
    if (bell) {
        bell.style.animation = 'bellShake 0.5s ease-in-out';
        setTimeout(() => {
            bell.style.animation = '';
        }, 500);
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