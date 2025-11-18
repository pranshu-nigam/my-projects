import toast from './Toast.js';
import { createZenPoseLogo } from './ZenPoseLogo.js';

export function renderProgress(app) {
    try {
        // Set current page to progress
        localStorage.setItem('zenpose_current_page', 'progress');
        
        // Clear any existing content and show loading state
        if (app) {
            app.innerHTML = '<div class="loading-message">Loading Progress...</div>';
        }
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            renderProgressContent(app);
        }, 50);
        
    } catch (error) {
        console.error('Error rendering Progress page:', error);
        if (app) {
            app.innerHTML = '<div class="error-message">Failed to load Progress page. Please try again.</div>';
        }
    }
}

function renderProgressContent(app) {
    try {
        
        app.innerHTML = `
        <div class="dashboard">
            <!-- Top Navigation Bar -->
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo-section">
                        <div class="logo-circle zenpose-logo" id="progress-logo">
                            <!-- ZenPose logo will be inserted here -->
                        </div>
                        <h1 class="brand-name">ZenPose</h1>
                    </div>
                </div>
                
                <div class="nav-center">
                    <div class="greeting-section">
                        <h2 class="greeting-text">Your Progress <span class="nav-emoji">📊</span></h2>
                        <p class="current-date" id="currentDate">Track your wellness journey</p>
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
                    <a href="#" class="sidebar-item active" data-section="progress">
                        <span class="sidebar-icon">📊</span>
                        <span class="sidebar-label">Progress</span>
                    </a>
                    <a href="#" class="sidebar-item" data-sn="ai-pose">
                        <span class="sidebar-icon">🤖</span>
                        <span class="sidebar-label">AI Pose</span>
                    </a>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="dashboard-main">
                <div class="progress-container">
                    <!-- Back Button -->
                    <div class="progress-back-btn" id="backToDashboard">
                        <div class="back-icon">←</div>
                        <span>Back to Dashboard</span>
                    </div>
                    
                    <!-- Progress Header -->
                    <div class="progress-header">
                        <div class="progress-title-section">
                            <h1 class="progress-main-title">Your Progress</h1>
                            <p class="progress-subtitle">Track your wellness journey and celebrate achievements</p>
                        </div>
                        
                        <div class="progress-controls">
                            <div class="time-toggle">
                                <button class="toggle-btn active" id="weeklyView">Weekly</button>
                                <button class="toggle-btn" id="monthlyView">Monthly</button>
                            </div>
                        </div>
                    </div>

                    <!-- Level System -->
                    <div class="level-section">
                        <div class="level-card">
                            <div class="level-info">
                                <div class="level-badge">
                                    <span class="level-number" id="currentLevel">3</span>
                                    <span class="level-text">Level</span>
                                </div>
                                <div class="level-details">
                                    <h3 class="level-title" id="levelTitle">Zen Explorer</h3>
                                    <p class="level-description">You're on a great journey to inner peace</p>
                                </div>
                            </div>
                            <div class="level-progress">
                                <div class="level-progress-bar">
                                    <div class="level-progress-fill" id="levelProgressFill" style="width: 65%"></div>
                                </div>
                                <div class="level-stats">
                                    <span class="current-xp" id="ctXP">1,250</span>
                                    <span class="next-level-xp" id="nextLevelXP">/ 2,000 XP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Streak Tracker -->
                    <div class="streak-section">
                        <div class="streak-card">
                            <div class="streak-icon" id="streakFlame">🔥</div>
                            <div class="streak-info">
                                <h3 class="streak-title">Current Streak</h3>
                                <div class="streak-count" id="streakCount">7 days</div>
                                <p class="streak-subtitle">Keep the momentum going!</p>
                            </div>
                        </div>
                    </div>

                    <!-- Progress Stats Grid -->
                    <div class="progress-stats-grid">
                        <!-- Meditation Progress -->
                        <div class="stat-card">
                            <div class="stat-header">
                                <div class="stat-icon">🧘‍♀️</div>
                                <div class="stat-info">
                                    <h3 class="stat-title">Meditation</h3>
                                    <p class="stat-subtitle">This week</p>
                                </div>
                            </div>
                            <div class="circular-progress">
                                <div class="progress-ring" id="meditationRing">
                                    <div class="progress-circle">
                                        <div class="progress-text">
                                            <span class="progress-number" id="meditationMinutes">45</span>
                                            <span class="progress-unit">min</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="stat-goal">
                                <span class="goal-text">Goal: 60 min</span>
                                <div class="goal-progress-bar">
                                    <div class="goal-progress-fill" id="meditationGoalFill" style="width: 75%"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Yoga Sessions -->
                        <div class="stat-card">
                            <div class="stat-header">
                                <div class="stat-icon">🧘‍♂️</div>
                                <div class="stat-info">
                                    <h3 class="stat-title">Yoga Sessions</h3>
                                    <p class="stat-subtitle">This week</p>
                                </div>
                            </div>
                            <div class="circular-progress">
                                <div class="progress-ring" id="yogaRing">
                                    <div class="progress-circle">
                                        <div class="progress-text">
                                            <span class="progress-number" id="yogaSessions">5</span>
                                            <span class="progress-unit">sessions</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="stat-goal">
                                <span class="goal-text">Goal: 7 sessions</span>
                                <div class="goal-progress-bar">
                                    <div class="goal-progress-fill" id="yogaGoalFill" style="width: 71%"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Mindfulness Minutes -->
                        <div class="stat-card">
                            <div class="stat-header">
                                <div class="stat-icon">🌱</div>
                                <div class="stat-info">
                                    <h3 class="stat-title">Mindfulness</h3>
                                    <p class="stat-subtitle">This week</p>
                                </div>
                            </div>
                            <div class="circular-progress">
                                <div class="progress-ring" id="mindfulnessRing">
                                    <div class="progress-circle">
                                        <div class="progress-text">
                                            <span class="progress-number" id="mindfulnessMinutes">120</span>
                                            <span class="progress-unit">min</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="stat-goal">
                                <span class="goal-text">Goal: 150 min</span>
                                <div class="goal-progress-bar">
                                    <div class="goal-progress-fill" id="mindfulnessGoalFill" style="width: 80%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Weekly Progress Timeline -->
                    <div class="timeline-section">
                        <h2 class="section-title">Weekly Progress</h2>
                        <div class="progress-timeline">
                            <div class="timeline-day" data-day="Mon">
                                <div class="day-dot completed" data-completion="100"></div>
                                <div class="day-label">Mon</div>
                                <div class="day-progress">
                                    <div class="day-bar">
                                        <div class="day-fill" style="height: 100%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-day" data-day="Tue">
                                <div class="day-dot completed" data-completion="80"></div>
                                <div class="day-label">Tue</div>
                                <div class="day-progress">
                                    <div class="day-bar">
                                        <div class="day-fill" style="height: 80%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-day" data-day="Wed">
                                <div class="day-dot completed" data-completion="100"></div>
                                <div class="day-label">Wed</div>
                                <div class="day-progress">
                                    <div class="day-bar">
                                        <div class="day-fill" style="height: 100%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-day" data-day="Thu">
                                <div class="day-dot completed" data-completion="60"></div>
                                <div class="day-label">Thu</div>
                                <div class="day-progress">
                                    <div class="day-bar">
                                        <div class="day-fill" style="height: 60%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-day" data-day="Fri">
                                <div class="day-dot completed" data-completion="90"></div>
                                <div class="day-label">Fri</div>
                                <div class="day-progress">
                                    <div class="day-bar">
                                        <div class="day-fill" style="height: 90%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-day" data-day="Sat">
                                <div class="day-dot current" data-completion="40"></div>
                                <div class="day-label">Sat</div>
                                <div class="day-progress">
                                    <div class="day-bar">
                                        <div class="day-fill current" style="height: 40%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-day" data-day="Sun">
                                <div class="day-dot" data-completion="0"></div>
                                <div class="day-label">Sun</div>
                                <div class="day-progress">
                                    <div class="day-bar">
                                        <div class="day-fill" style="height: 0%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Milestone Badges - FIXED SEAMLESS BACKGROUND -->
                    <div class="badges-section" style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%); border-radius: 24px; padding: 3rem 2rem; margin: 2rem 0; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2); backdrop-filter: blur(20px); border: 1px solid rgba(59, 130, 246, 0.1); position: relative; overflow: hidden;">
                        <!-- Subtle gradient overlay for seamless blending -->
                        <div style="position: absolute; top: 0; left: 0; right: 0; height: 40px; background: linear-gradient(to bottom, rgba(15, 23, 42, 0.8), transparent); pointer-events: none;"></div>
                        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent); pointer-events: none;"></div>
                        
                        <h2 class="section-title" style="text-align: center; color: #14b8a6; margin-bottom: 2.5rem; font-size: 2rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">Achievements</h2>
                        
                        <div class="badges-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1;">
                            <div class="badge-card unlocked" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(515, 85, 0.8) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; height: fit-content; position: relative; overflow: hidden; backdrop-filter: blur(12px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                    <div class="badge-icon" style="font-size: 2rem; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));">🏅</div>
                                    <div class="badge-status" style="background: rgba(59, 130, 246, 0.25); color: #60a5fa; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Unlocked</div>
                                </div>
                                <div class="badge-info">
                                    <h4 class="badge-title" style="color: white; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">First Steps</h4>
                                    <p class="badge-description" style="color: #94a3b8; font-size: 0.875rem; line-height: 1.4; margin: 0;">Complete your first session</p>
                                </div>
                                <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #18a6, #06b6d4); opacity: 0.8;"></div>
                            </div>
                            <div class="badge-card unlocked" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; height: fit-content; position: relative; overflow: hidden; backdrop-filter: blur(12px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                    <div class="badge-icon" style="font-size: 2rem; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));">🔥</div>
                                    <div class="badge-status" style="background: rgba(59, 130, 246, 0.25); color: #60a5fa; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Unlocked</div>
                                </div>
                                <div class="badge-info">
                                    <h4 class="badge-title" style="color: white; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">Streak Master</h4>
                                    <p class="badge-description" style="color: #94a3b8; font-size: 0.875rem; line-height: 1.4; margin: 0;">7 days in a row</p>
                                </div>
                                <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #14b8a6, #06b6d4); opacity: 0.8;"></div>
                            </div>
                            <div class="badge-card unlocked" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; height: fit-content; position: relative; overflow: hidden; backdrop-filter: blur(12px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                    <div class="badge-icon" style="font-size: 2rem; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));">⏰</div>
                                    <div class="badge-status" style="background: rgba(59, 130, 246, 0.25); color: #60a5fa; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Unlocked</div>
                                </div>
                                <div class="badge-info">
                                    <h4 class="badge-title" style="color: white; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">Time Keeper</h4>
                                    <p class="badge-description" style="color: #94a3b8; font-size: 0.875rem; line-height: 1.4; margin: 0;">100 minutes meditated</p>
                                </div>
                                <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #14b8a6, #06b6d4); opacity: 0.8;"></div>
                            </div>
                            <div class="badge-card locked" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.5) 100%); border: 1px solid rgba(75, 85, 99, 0.3); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; height: fit-content; position: relative; overflow: hidden; backdrop-filter: blur(8px); opacity: 0.7; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: all 0.3s ease; cursor: pointer;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                    <div class="badge-icon" style="font-size: 2rem; filter: grayscale(1) opacity(0.6);">🌟</div>
                                    <div class="badge-status" style="background: rgba(75, 85, 99, 0.3); color: #9ca3af; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Locked</div>
                                </div>
                                <div class="badge-info">
                                    <h4 class="badge-title" style="color: #e2e8f0; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Zen Master</h4>
                                    <p class="badge-description" style="color: #64748b; font-size: 0.875rem; line-height: 1.4; margin: 0;">30 days streak</p>
                                </div>
                            </div>
                            <div class="badge-card locked" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.5) 100%); border: 1px solid rgba(75, 85, 99, 0.3); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; height: fit-content; position: relative; overflow: hidden; backdrop-filter: blur(8px); opacity: 0.7; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: all 0.3s ease; cursor: pointer;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                    <div class="badge-icon" style="font-size: 2rem; filter: grayscale(1) opacity(0.6);">💎</div>
                                    <div class="badge-status" style="background: rgba(75, 85, 99, 0.3); color: #9ca3af; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Locked</div>
                                </div>
                                <div class="badge-info">
                                    <h4 class="badge-title" style="color: #e2e8f0; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Diamond Mind</h4>
                                    <p class="badge-description" style="color: #64748b; font-size: 0.875rem; line-height: 1.4; margin: 0;">500 minutes total</p>
                                </div>
                            </div>
                            <div class="badge-card locked" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.5) 100%); border: 1px solid rgba(75, 85, 99, 0.3); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; height: fit-content; position: relative; overflow: hidden; backdrop-filter: blur(8px); opacity: 0.7; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: all 0.3s ease; cursor: pointer;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                    <div class="badge-icon" style="font-size: 2rem; filter: grayscale(1) opacity(0.6);">🎯</div>
                                    <div class="badge-status" style="background: rgba(75, 85, 99, 0.3); color: #9ca3af; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Locked</div>
                                </div>
                                <div class="badge-info">
                                    <h4 class="badge-title" style="color: #e2e8f0; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Goal Crusher</h4>
                                    <p class="badge-description" style="color: #64748b; font-size: 0.875rem; line-height: 1.4; margin: 0;">Complete all weekly goals</p>
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
            setupProgressEvents();
            
            // Initialize ZenPose logo
            const logoContainer = document.querySelector('#progress-logo');
            if (logoContainer) {
                // Clear any existing content
                logoContainer.innerHTML = '';
                const zenposeLogo = createZenPoseLogo('w-12 h-12');
                logoContainer.appendChild(zenposeLogo);
            }
        }, 100);
        
    } catch (error) {
        console.error('Error rendering Progress content:', error);
        if (app) {
            app.innerHTML = '<div class="error-message">Failed to load Progress page. Please try again.</div>';
        }
    }
}

function setupProgressEvents() {
    try {
        // Load user data
        const userData = JSON.parse(localStorage.getItem('zenpose_user') || '{}');
        const userName = userData.username || 'User';
        const userLevel = userData.evel || 'Yogi';
    
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
            userDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', () => {
            userDropdown.classList.remove('show');
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
            // Import and use the delete account modal from Dashboard
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
                // Already on progress page
                toast.info('You are already on the Progress page', 'Navigation');
            } else if (section === 'ai-pose') {
                localStorage.setItem('zenpose_current_page', 'ai-pose');
                window.location.reload();
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

    // Time toggle
    const weeklyViewBtn = document.getElementById('weeklyView');
    const monthlyViewBtn = document.getElementById('monthlyView');

    if (weeklyViewBtn) {
        weeklyViewBtn.addEventListener('click', () => {
            weeklyViewBtn.classList.add('active');
            monthlyViewBtn.classList.remove('active');
            toast.info('Switched to weekly view', 'View Changed');
        });
    }

    if (monthlyViewBtn) {
        monthlyViewBtn.addEventListener('click', () => {
            monthlyViewBtn.classList.add('active');
            weeklyViewBtn.classList.remove('active');
            toast.info('Switched to monthly view', 'View Changed');
        });
    }

        // Initialize animations
        initializeProgressAnimations();
        initializeStreakAnimation();
        initializeBadgeAnimations();
        
    } catch (error) {
        console.error('Error setting up Progress events:', error);
    }
}

// Animation Functions
function initializeProgressAnimations() {
    try {
        // Animate circular progress rings
        setTimeout(() => {
            animateCircularProgress('meditationRing', 75);
            animateCircularProgress('yogaRing', 71);
            animateCircularProgress('mindfulnessRing', 80);
        }, 500);

        // Animate count-up numbers
        setTimeout(() => {
            animateCountUpNumbers();
        }, 600);

        // Animate progress bars
        setTimeout(() => {
            animateProgressBars();
        }, 800);

        // Animate timeline
        setTimeout(() => {
            animateTimeline();
        }, 1000);
    } catch (error) {
        console.error('Error initializing progress animations:', error);
    }
}

function animateCircularProgress(ringId, percentage) {
    try {
        const ring = document.getElementById(ringId);
        if (!ring) {
            console.warn(`Element with id ${ringId} not found`);
            return;
        }

        const circle = ring.querySelector('.progress-circle');
        if (!circle) {
            console.warn(`Progress circle not found in ${ringId}`);
            return;
        }

        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (percentage / 100) * circumference;

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
            circle.style.strokeDashoffset = offset;
        }, 200);
    } catch (error) {
        console.error(`Error animating circular progress for ${ringId}:`, error);
    }
}

function animateCountUpNumbers() {
    try {
        const countUpElements = [
            { id: 'meditationMinutes', target: 45, suffix: 'min' },
            { id: 'yogaSessions', target: 5, suffix: 'sessions' },
            { id: 'mindfulnessMinutes', target: 120, suffix: 'min' }
        ];

        countUpElements.forEach((element, index) => {
            const el = document.getElementById(element.id);
            if (!el) {
                console.warn(`Element with id ${element.id} not found for count-up animation`);
                return;
            }

            // Add animation class
            el.classList.add('animating');
            
            // Start count-up animation
            setTimeout(() => {
                animateNumber(el, 0, element.target, 1500, element.suffix);
            }, index * 200);
        });
    } catch (error) {
        console.error('Error animating count-up numbers:', error);
    }
}

function animateNumber(element, start, end, duration, suffix) {
    const startTime = performance.now();
    const suffixElement = element.nextElementSibling;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = end;
            element.classList.remove('animating');
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.goal-progress-fill, .level-progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = width;
        }, 100);
    });
}

function animateTimeline() {
    const timelineDays = document.querySelectorAll('.timeline-day');
    timelineDays.forEach((day, index) => {
        day.style.opacity = '0';
        day.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            day.style.transition = 'all 0.5s ease-out';
            day.style.opacity = '1';
            day.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initializeStreakAnimation() {
    const flame = document.getElementById('streakFlame');
    if (flame) {
        // Add flickering animation
        setInterval(() => {
            flame.style.animation = 'none';
            setTimeout(() => {
                flame.style.animation = 'flameFlicker 0.5s ease-in-out';
            }, 10);
        }, 3000);
    }
}

function initializeBadgeAnimations() {
    const unlockedBadges = document.querySelectorAll('.badge-card.unlocked');
    unlockedBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.6s ease-out';
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
            
            // Add confetti effect for first badge
            if (index === 0) {
                createConfettiBurst(badge);
            }
        }, 1500 + (index * 200));
    });
}

function createConfettiBurst(element) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-burst';
    
    // Create confetti pieces
    for (let i = 0; i < 8; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.top = Math.random() * 100 + '%';
        confetti.appendChild(piece);
    }
    
    element.style.position = 'relative';
    element.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 1000);
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