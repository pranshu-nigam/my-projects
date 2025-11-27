import toast from './Toast.js';

export function renderProfile(app) {
    // Set current page to profile
    localStorage.setItem('zenpose_current_page', 'profile');
    
    // Get user data
    const userData = JSON.parse(localStorage.getItem('zenpose_user') || '{}');
    const userName = userData.username || 'User';
    const userEmail = userData.email || 'user@example.com';
    const userLevel = userData.level || 'Beginner';
    
    app.innerHTML = `
        <div class="profile-container">
            <!-- Back Button -->
            <div class="profile-back-btn" id="backToDashboard">
                <div class="back-icon">←</div>
                <span>Back to Dashboard</span>
            </div>
            
            <!-- Profile Header -->
            <div class="profile-header">
                <div class="profile-avatar-container">
                    <div class="profile-avatar" id="profileAvatar">
                        <div class="avatar-image">
                            <div class="avatar-initial">${userName.charAt(0).toUpperCase()}</div>
                        </div>
                        <div class="avatar-edit-overlay">
                            <div class="edit-icon">✏️</div>
                        </div>
                        <div class="avatar-level-badge">${userLevel}</div>
                    </div>
                    <div class="avatar-progress-ring">
                        <svg class="progress-ring" width="120" height="120">
                            <circle class="progress-ring-circle" cx="60" cy="60" r="54" fill="transparent" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
                            <circle class="progress-ring-fill" cx="60" cy="60" r="54" fill="transparent" stroke="url(#gradient)" stroke-width="4" stroke-linecap="round" stroke-dasharray="339.292" stroke-dashoffset="203.575"/>
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                
                <div class="profile-info">
                    <h1 class="profile-name">${userName}</h1>
                    <p class="profile-email">${userEmail}</p>
                    <div class="profile-level">
                        <span class="level-badge">${userLevel}</span>
                        <div class="level-progress-bar">
                            <div class="progress-fill" style="width: 68%"></div>
                            <span class="progress-text">Level 2 • 340/500 XP</span>
                        </div>
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="theme-toggle-btn" id="themeToggleBtn">
                        <div class="theme-icon">🌙</div>
                    </button>
                    <button class="profile-action-btn edit-profile-btn" id="editProfileBtn">
                        <div class="btn-icon">✏️</div>
                        <span>Edit Profile</span>
                    </button>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="quick-actions">
                <div class="action-card" id="myActivityBtn">
                    <div class="action-icon">📊</div>
                    <div class="action-content">
                        <div class="action-title">My Activity</div>
                        <div class="action-subtitle">View your progress</div>
                    </div>
                    <div class="action-arrow">→</div>
                </div>
                <div class="action-card" id="notificationsBtn">
                    <div class="action-icon">🔔</div>
                    <div class="action-content">
                        <div class="action-title">Notifications</div>
                        <div class="action-subtitle">3 new messages</div>
                    </div>
                    <div class="action-arrow">→</div>
                </div>
                <div class="action-card" id="messagesBtn">
                    <div class="action-icon">💬</div>
                    <div class="action-content">
                        <div class="action-title">Messages</div>
                        <div class="action-subtitle">Community chat</div>
                    </div>
                    <div class="action-arrow">→</div>
                </div>
            </div>
            
            <!-- Profile Stats -->
            <div class="profile-stats">
                <div class="stat-card">
                    <div class="stat-icon">🧘‍♀️</div>
                    <div class="stat-content">
                        <div class="stat-number">47</div>
                        <div class="stat-label">Sessions Completed</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⏱️</div>
                    <div class="stat-content">
                        <div class="stat-number">23.5h</div>
                        <div class="stat-label">Total Practice Time</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-content">
                        <div class="stat-number">12</div>
                        <div class="stat-label">Day Streak</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-content">
                        <div class="stat-number">8</div>
                        <div class="stat-label">Achievements</div>
                    </div>
                </div>
            </div>
            
            <!-- Profile Sections -->
            <div class="profile-sections">
                <!-- Personal Information -->
                <div class="profile-section">
                    <div class="section-header">
                        <div class="section-icon">👤</div>
                        <h3 class="section-title">Personal Information</h3>
                    </div>
                    <div class="section-content">
                        <div class="info-item">
                            <div class="info-label">Full Name</div>
                            <div class="info-value">${userName}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Email</div>
                            <div class="info-value">${userEmail}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Member Since</div>
                            <div class="info-value">January 2024</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Preferred Practice Time</div>
                            <div class="info-value">Morning (6:00 AM)</div>
                        </div>
                    </div>
                </div>
                
                <!-- Achievements -->
                <div class="profile-section">
                    <div class="section-header">
                        <div class="section-icon">🏆</div>
                        <h3 class="section-title">Achievements</h3>
                    </div>
                    <div class="section-content">
                        <div class="achievements-grid">
                            <div class="achievement-item earned">
                                <div class="achievement-icon">🌟</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">First Steps</div>
                                    <div class="achievement-desc">Complete your first session</div>
                                </div>
                            </div>
                            <div class="achievement-item earned">
                                <div class="achievement-icon">🔥</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">Streak Master</div>
                                    <div class="achievement-desc">7-day practice streak</div>
                                </div>
                            </div>
                            <div class="achievement-item earned">
                                <div class="achievement-icon">⏰</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">Early Bird</div>
                                    <div class="achievement-desc">Complete 10 morning sessions</div>
                                </div>
                            </div>
                            <div class="achievement-item earned">
                                <div class="achievement-icon">🧘‍♀️</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">Zen Master</div>
                                    <div class="achievement-desc">Complete 25 sessions</div>
                                </div>
                            </div>
                            <div class="achievement-item locked">
                                <div class="achievement-icon">💎</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">Diamond Level</div>
                                    <div class="achievement-desc">Complete 100 sessions</div>
                                </div>
                            </div>
                            <div class="achievement-item locked">
                                <div class="achievement-icon">👑</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">Yoga Legend</div>
                                    <div class="achievement-desc">Complete 500 sessions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Practice History -->
                <div class="profile-section">
                    <div class="section-header">
                        <div class="section-icon">📊</div>
                        <h3 class="section-title">Practice History</h3>
                    </div>
                    <div class="section-content">
                        <div class="practice-chart">
                            <div class="chart-header">
                                <h4>Last 7 Days</h4>
                                <div class="chart-legend">
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: #10b981;"></div>
                                        <span>Completed</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: #e5e7eb;"></div>
                                        <span>Missed</span>
                                    </div>
                                </div>
                            </div>
                            <div class="chart-bars">
                                <div class="chart-bar completed" style="height: 80%;" title="Monday: 25 min"></div>
                                <div class="chart-bar completed" style="height: 60%;" title="Tuesday: 20 min"></div>
                                <div class="chart-bar completed" style="height: 100%;" title="Wednesday: 30 min"></div>
                                <div class="chart-bar missed" style="height: 20%;" title="Thursday: Missed"></div>
                                <div class="chart-bar completed" style="height: 70%;" title="Friday: 22 min"></div>
                                <div class="chart-bar completed" style="height: 90%;" title="Saturday: 28 min"></div>
                                <div class="chart-bar completed" style="height: 85%;" title="Sunday: 26 min"></div>
                            </div>
                            <div class="chart-labels">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupProfileEvents();
}

function setupProfileEvents() {
    // Back to dashboard
    const backBtn = document.getElementById('backToDashboard');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Import and render dashboard
            import('./Dashboard.js').then(module => {
                module.renderDashboard(document.getElementById('app'));
            });
        });
    }
    
    // Edit profile button
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            toast.featureComingSoon('Profile editing');
        });
    }
    
    // Profile avatar click
    const profileAvatar = document.getElementById('profileAvatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('click', () => {
            toast.featureComingSoon('Profile picture upload');
        });
    }
    
    // Theme toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('zenpose_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.querySelector('.theme-icon').textContent = '☀️';
        }
        
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            // Save theme preference
            localStorage.setItem('zenpose_theme', isDark ? 'dark' : 'light');
            
            // Update icon
            themeToggleBtn.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
            
            // Show notification
            toast.info(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'Theme Changed');
        });
    }
    
    // Quick actions
    const myActivityBtn = document.getElementById('myActivityBtn');
    if (myActivityBtn) {
        myActivityBtn.addEventListener('click', () => {
            toast.featureComingSoon('Activity dashboard');
        });
    }
    
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', () => {
            toast.featureComingSoon('Notifications center');
        });
    }
    
    const messagesBtn = document.getElementById('messagesBtn');
    if (messagesBtn) {
        messagesBtn.addEventListener('click', () => {
            toast.featureComingSoon('Messages center');
        });
    }
    
    // Achievement hover effects
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (item.classList.contains('earned')) {
                item.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Stat cards hover effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}
