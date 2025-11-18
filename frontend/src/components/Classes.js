import toast from './Toast.js';
import { createZenPoseLogo } from './ZenPoseLogo.js';

export function renderClasses(app) {
    // Set current page to classes
    localStorage.setItem('zenpose_current_page', 'classes');
    
    app.innerHTML = `
        <div class="dashboard">
            <!-- Top Navigation Bar -->
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo-section">
                        <div class="logo-circle zenpose-logo" id="classes-logo">
                            <!-- ZenPose logo will be inserted here -->
                        </div>
                        <h1 class="brand-name">ZenPose</h1>
                    </div>
                </div>
                
                <div class="nav-center">
                    <div class="greeting-section">
                        <h2 class="greeting-text">Yoga Classes <span class="nav-emoji">🧘‍♀️</span></h2>
                        <p class="current-date" id="currentDate">Find your perfect practice</p>
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
                    <a href="#" class="sidebar-item active" data-section="classes">
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
                <div class="classes-container">
                    <!-- Back Button -->
                    <div class="classes-back-btn" id="backToDashboard">
                        <div class="back-icon">←</div>
                        <span>Back to Dashboard</span>
                    </div>
            
            <!-- Classes Header -->
            <div class="classes-header">
                <div class="classes-title-section">
                    <h1 class="classes-main-title">Yoga Classes</h1>
                    <p class="classes-subtitle">Find your perfect practice</p>
                </div>
                
                <div class="classes-controls">
                    <div class="view-toggle">
                        <button class="toggle-btn active" id="todayView">Today's Classes</button>
                        <button class="toggle-btn" id="weeklyView">Weekly Schedule</button>
                    </div>
                    
                    <div class="mood-recommendation" id="moodRecommendation">
                        <div class="mood-icon">🧘‍♀️</div>
                        <div class="mood-text">
                            <span class="mood-label">Feeling stressed?</span>
                            <span class="mood-suggestion">Try Evening Relaxation (20 min)</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Today's Classes View -->
            <div class="classes-view active" id="todayClassesView">
                <div class="upcoming-classes">
                    <h2 class="section-title">Upcoming Classes</h2>
                    
                    <!-- Countdown Timer -->
                    <div class="countdown-timer" id="countdownTimer">
                        <div class="timer-icon">⏰</div>
                        <div class="timer-text" id="countdownText">Next class in 00:12:34</div>
                    </div>
                    
                    <div class="classes-list">
                        <!-- Class Card 1 -->
                        <div class="class-card upcoming" data-class-id="1">
                            <div class="achievement-badge" style="display: none;">🌟</div>
                            <div class="class-status">
                                <div class="status-badge upcoming">Upcoming</div>
                                <div class="class-time">7:00 AM</div>
                            </div>
                            
                            <div class="class-content">
                                <div class="class-header">
                                    <h3 class="class-name">Yoga for Flexibility</h3>
                                    <div class="difficulty-badge beginner">Beginner</div>
                                </div>
                                
                                <p class="class-description">Enhance your flexibility with gentle stretches and mindful movements</p>
                                
                                <div class="class-meta">
                                    <div class="class-duration">45 min</div>
                                    <div class="class-instructor">
                                        <div class="instructor-avatar">👩‍🏫</div>
                                        <div class="instructor-info">
                                            <span class="instructor-name">Sarah</span>
                                            <span class="instructor-title">Certified Yoga Trainer</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="class-actions">
                                    <button class="action-btn primary" data-action="join">
                                        <span class="btn-icon">🎯</span>
                                        <span>Join Now</span>
                                    </button>
                                    <button class="action-btn secondary" data-action="calendar">
                                        <span class="btn-icon">📅</span>
                                        <span>Add to Calendar</span>
                                    </button>
                                    <button class="action-btn secondary" data-action="reminder">
                                        <span class="btn-icon">🔔</span>
                                        <span>Set Reminder</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Class Card 2 -->
                        <div class="class-card upcoming" data-class-id="2">
                            <div class="class-status">
                                <div class="status-badge upcoming">Upcoming</div>
                                <div class="class-time">6:00 PM</div>
                            </div>
                            
                            <div class="class-content">
                                <div class="class-header">
                                    <h3 class="class-name">Mindful Breathing</h3>
                                    <div class="difficulty-badge intermediate">Intermediate</div>
                                </div>
                                
                                <p class="class-description">Deep breathing techniques for stress relief and mental clarity</p>
                                
                                <div class="class-meta">
                                    <div class="class-duration">30 min</div>
                                    <div class="class-instructor">
                                        <div class="instructor-avatar">👨‍🏫</div>
                                        <div class="instructor-info">
                                            <span class="instructor-name">Michael</span>
                                            <span class="instructor-title">Meditation Specialist</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="class-actions">
                                    <button class="action-btn primary" data-action="join">
                                        <span class="btn-icon">🎯</span>
                                        <span>Join Now</span>
                                    </button>
                                    <button class="action-btn secondary" data-action="calendar">
                                        <span class="btn-icon">📅</span>
                                        <span>Add to Calendar</span>
                                    </button>
                                    <button class="action-btn secondary" data-action="reminder">
                                        <span class="btn-icon">🔔</span>
                                        <span>Set Reminder</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Class Card 3 - Tomorrow -->
                        <div class="class-card upcoming" data-class-id="3">
                            <div class="class-status">
                                <div class="status-badge upcoming">Tomorrow</div>
                                <div class="class-time">7:00 AM</div>
                            </div>
                            
                            <div class="class-content">
                                <div class="class-header">
                                    <h3 class="class-name">Stress Relief</h3>
                                    <div class="difficulty-badge advanced">Advanced</div>
                                </div>
                                
                                <p class="class-description">Advanced techniques for managing stress and building resilience</p>
                                
                                <div class="class-meta">
                                    <div class="class-duration">60 min</div>
                                    <div class="class-instructor">
                                        <div class="instructor-avatar">👩‍🏫</div>
                                        <div class="instructor-info">
                                            <span class="instructor-name">Emma</span>
                                            <span class="instructor-title">Stress Management Expert</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="class-actions">
                                    <button class="action-btn primary" data-action="join">
                                        <span class="btn-icon">🎯</span>
                                        <span>Join Now</span>
                                    </button>
                                    <button class="action-btn secondary" data-action="calendar">
                                        <span class="btn-icon">📅</span>
                                        <span>Add to Calendar</span>
                                    </button>
                                    <button class="action-btn secondary" data-action="reminder">
                                        <span class="btn-icon">🔔</span>
                                        <span>Set Reminder</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Completed Class Example -->
                        <div class="class-card completed" data-class-id="4">
                            <div class="class-status">
                                <div class="status-badge completed">✅ Completed</div>
                                <div class="class-time">9:00 AM</div>
                            </div>
                            
                            <div class="class-content">
                                <div class="class-header">
                                    <h3 class="class-name">Morning Flow</h3>
                                    <div class="difficulty-badge beginner">Beginner</div>
                                </div>
                                
                                <p class="class-description">Energize your day with gentle stretches and mindful movements</p>
                                
                                <div class="class-meta">
                                    <div class="class-duration">20 min</div>
                                    <div class="class-instructor">
                                        <div class="instructor-avatar">👨‍🏫</div>
                                        <div class="instructor-info">
                                            <span class="instructor-name">David</span>
                                            <span class="instructor-title">Morning Yoga Specialist</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="class-actions">
                                    <button class="action-btn completed" data-action="review">
                                        <span class="btn-icon">⭐</span>
                                        <span>Rate & Review</span>
                                    </button>
                                    <button class="action-btn secondary" data-action="repeat">
                                        <span class="btn-icon">🔄</span>
                                        <span>Repeat Class</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Weekly Schedule View -->
            <div class="classes-view" id="weeklyClassesView">
                <div class="weekly-schedule">
                    <h2 class="section-title">Weekly Schedule</h2>
                    <div class="calendar-grid">
                        <div class="calendar-day">
                            <div class="day-header">
                                <span class="day-name">Monday</span>
                                <span class="day-date">Dec 16</span>
                            </div>
                            <div class="day-classes">
                                <div class="mini-class-card">
                                    <span class="mini-time">7:00 AM</span>
                                    <span class="mini-title">Morning Flow</span>
                                    <span class="mini-difficulty beginner">B</span>
                                </div>
                                <div class="mini-class-card">
                                    <span class="mini-time">6:00 PM</span>
                                    <span class="mini-title">Evening Relaxation</span>
                                    <span class="mini-difficulty intermediate">I</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="calendar-day">
                            <div class="day-header">
                                <span class="day-name">Tuesday</span>
                                <span class="day-date">Dec 17</span>
                            </div>
                            <div class="day-classes">
                                <div class="mini-class-card">
                                    <span class="mini-time">7:00 AM</span>
                                    <span class="mini-title">Yoga for Flexibility</span>
                                    <span class="mini-difficulty beginner">B</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="calendar-day">
                            <div class="day-header">
                                <span class="day-name">Wednesday</span>
                                <span class="day-date">Dec 18</span>
                            </div>
                            <div class="day-classes">
                                <div class="mini-class-card">
                                    <span class="mini-time">6:00 PM</span>
                                    <span class="mini-title">Mindful Breathing</span>
                                    <span class="mini-difficulty intermediate">I</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="calendar-day">
                            <div class="day-header">
                                <span class="day-name">Thursday</span>
                                <span class="day-date">Dec 19</span>
                            </div>
                            <div class="day-classes">
                                <div class="mini-class-card">
                                    <span class="mini-time">7:00 AM</span>
                                    <span class="mini-title">Stress Relief</span>
                                    <span class="mini-difficulty advanced">A</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="calendar-day">
                            <div class="day-header">
                                <span class="day-name">Friday</span>
                                <span class="day-date">Dec 20</span>
                            </div>
                            <div class="day-classes">
                                <div class="mini-class-card">
                                    <span class="mini-time">6:00 PM</span>
                                    <span class="mini-title">Weekend Prep</span>
                                    <span class="mini-difficulty beginner">B</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="calendar-day weekend">
                            <div class="day-header">
                                <span class="day-name">Saturday</span>
                                <span class="day-date">Dec 21</span>
                            </div>
                            <div class="day-classes">
                                <div class="mini-class-card">
                                    <span class="mini-time">10:00 AM</span>
                                    <span class="mini-title">Weekend Wellness</span>
                                    <span class="mini-difficulty intermediate">I</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="calendar-day weekend">
                            <div class="day-header">
                                <span class="day-name">Sunday</span>
                                <span class="day-date">Dec 22</span>
                            </div>
                            <div class="day-classes">
                                <div class="mini-class-card">
                                    <span class="mini-time">9:00 AM</span>
                                    <span class="mini-title">Sunday Meditation</span>
                                    <span class="mini-difficulty beginner">B</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </main>
        </div>

        <!-- Class Details Modal -->
        <div class="class-modal" id="classModal">
            <div class="class-modal-content">
                <div class="modal-header">
                    <h2 class="modal-title" id="modalTitle">Class Details</h2>
                    <button class="modal-close" id="modalClose">×</button>
                </div>
                
                <div class="modal-instructor" id="modalInstructor">
                    <div class="modal-instructor-avatar" id="modalInstructorAvatar">👩‍🏫</div>
                    <div class="modal-instructor-info">
                        <h3 id="modalInstructorName">Sarah</h3>
                        <p id="modalInstructorTitle">Certified Yoga Trainer</p>
                    </div>
                </div>
                
                <div class="modal-benefits">
                    <h4>Benefits of this session:</h4>
                    <ul class="benefits-list" id="modalBenefits">
                        <li>Improved flexibility and range of motion</li>
                        <li>Reduced muscle tension and stress</li>
                        <li>Better posture and body awareness</li>
                        <li>Enhanced relaxation and mindfulness</li>
                    </ul>
                </div>
                
                <div class="modal-requirements">
                    <h4>What you'll need:</h4>
                    <ul class="requirements-list" id="modalRequirements">
                        <li>Yoga mat or comfortable surface</li>
                        <li>Water bottle</li>
                        <li>Comfortable clothing</li>
                        <li>Quiet, calm space</li>
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="action-btn secondary" id="modalJoinBtn">
                        <span class="btn-icon">🎯</span>
                        <span>Join Now</span>
                    </button>
                    <button class="action-btn secondary" id="modalCloseBtn">
                        <span class="btn-icon">✕</span>
                        <span>Close</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    setupClassesEvents();
    
    // Initialize ZenPose logo
    setTimeout(() => {
        const logoContainer = document.querySelector('#classes-logo');
        if (logoContainer) {
            // Clear any existing content
            logoContainer.innerHTML = '';
            const zenposeLogo = createZenPoseLogo('w-12 h-12');
            logoContainer.appendChild(zenposeLogo);
        }
    }, 0);
}

function setupClassesEvents() {
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
                // Already on classes page
                toast.info('You are already on the Classes page', 'Navigation');
            } else if (section === 'progress') {
                import('./Progress.js').then(module => {
                    module.renderProgress(document.getElementById('app'));
                });
            } else if (section === 'ai-pose') {
                localStorage.setItem('zenpose_current_page', 'ai-pose');
                window.location.reload();
            }
        });
    });

    // Back to dashboard
    document.getElementById('backToDashboard').addEventListener('click', () => {
        // Clear notification flags when leaving classes page
        clearNotificationFlags();
        import('./Dashboard.js').then(module => {
            module.renderDashboard(document.getElementById('app'));
        });
    });

    // View toggle
    const todayViewBtn = document.getElementById('todayView');
    const weeklyViewBtn = document.getElementById('weeklyView');
    const todayView = document.getElementById('todayClassesView');
    const weeklyView = document.getElementById('weeklyClassesView');

    todayViewBtn.addEventListener('click', () => {
        todayViewBtn.classList.add('active');
        weeklyViewBtn.classList.remove('active');
        todayView.classList.add('active');
        weeklyView.classList.remove('active');
    });

    weeklyViewBtn.addEventListener('click', () => {
        weeklyViewBtn.classList.add('active');
        todayViewBtn.classList.remove('active');
        weeklyView.classList.add('active');
        todayView.classList.remove('active');
    });

    // Initialize countdown timer
    initializeCountdownTimer();

    // Initialize smart notifications
    initializeSmartNotifications();

    // Add achievement badges
    addAchievementBadges();

    // Add starting soon animations
    addStartingSoonAnimations();

    // Class actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.currentTarget.getAttribute('data-action');
            const classCard = e.currentTarget.closest('.class-card');
            const className = classCard.querySelector('.class-name').textContent;
            
            switch(action) {
                case 'join':
                    toast.success(`Joining ${className}...`, 'Class Starting');
                    // Add confetti animation
                    createConfettiBurst(classCard);
                    break;
                case 'calendar':
                    toast.info('Added to your calendar', 'Calendar Updated');
                    break;
                case 'reminder':
                    toast.info('Reminder set for 15 minutes before class', 'Reminder Set');
                    break;
                case 'review':
                    toast.info('Opening review form...', 'Rate Your Experience');
                    break;
                case 'repeat':
                    toast.success(`Starting ${className} again...`, 'Class Restarting');
                    break;
            }
        });
    });

    // Class card click to open modal
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on action buttons
            if (e.target.closest('.action-btn')) return;
            
            const className = card.querySelector('.class-name').textContent;
            const instructorName = card.querySelector('.instructor-name').textContent;
            const instructorTitle = card.querySelector('.instructor-title').textContent;
            const instructorAvatar = card.querySelector('.instructor-avatar').textContent;
            
            openClassModal(className, instructorName, instructorTitle, instructorAvatar);
        });
    });

    // Modal functionality
    const modal = document.getElementById('classModal');
    const modalClose = document.getElementById('modalClose');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalJoinBtn = document.getElementById('modalJoinBtn');

    if (modalClose) {
        modalClose.addEventListener('click', closeClassModal);
    }
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeClassModal);
    }
    if (modalJoinBtn) {
        modalJoinBtn.addEventListener('click', () => {
            const className = document.getElementById('modalTitle').textContent;
            toast.success(`Joining ${className}...`, 'Class Starting');
            closeClassModal();
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeClassModal();
            }
        });
    }

    // Mood recommendation click
    const moodRecommendation = document.getElementById('moodRecommendation');
    moodRecommendation.addEventListener('click', () => {
        toast.info('Opening Evening Relaxation class...', 'Recommended for You');
    });
}

// Helper Functions

function initializeCountdownTimer() {
    const countdownText = document.getElementById('countdownText');
    if (!countdownText) return;

    // Simulate next class in 12 minutes 34 seconds
    let totalSeconds = 12 * 60 + 34; // 12:34
    let notificationShown = false;

    function updateCountdown() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        countdownText.textContent = `Next class in ${timeString}`;

        // Show notification when 5 minutes remaining
        if (totalSeconds === 5 * 60 && !notificationShown) {
            showClassStartingNotification('Yoga for Flexibility', '5 minutes');
            notificationShown = true;
        }

        if (totalSeconds <= 0) {
            countdownText.textContent = 'Class starting now!';
            // Trigger notification
            toast.info('Your class is starting now!', 'Class Time');
            totalSeconds = 12 * 60 + 34; // Reset for demo
            notificationShown = false; // Reset notification flag
        }

        totalSeconds--;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initializeSmartNotifications() {
    // Check if notifications have already been shown for this session
    const notificationsShown = localStorage.getItem('zenpose_classes_notifications_shown');
    
    if (notificationsShown) {
        return; // Don't show notifications again in the same session
    }
    
    // Mark notifications as shown
    localStorage.setItem('zenpose_classes_notifications_shown', 'true');
    
    // Show only one welcome notification
    setTimeout(() => {
        toast.info('Welcome to your Classes! Check out today\'s sessions below 🧘‍♀️', 'Classes Ready');
    }, 2000);
}

function addAchievementBadges() {
    // Check if achievement has already been shown
    const achievementShown = localStorage.getItem('zenpose_achievement_shown');
    
    if (achievementShown) {
        // Just show the badge without notification
        const firstCard = document.querySelector('.class-card[data-class-id="1"]');
        if (firstCard) {
            const badge = firstCard.querySelector('.achievement-badge');
            if (badge) {
                badge.style.display = 'block';
            }
        }
        return;
    }
    
    // Mark achievement as shown
    localStorage.setItem('zenpose_achievement_shown', 'true');
    
    // Simulate achievement unlock (only once)
    setTimeout(() => {
        const firstCard = document.querySelector('.class-card[data-class-id="1"]');
        if (firstCard) {
            const badge = firstCard.querySelector('.achievement-badge');
            if (badge) {
                badge.style.display = 'block';
                toast.success('Achievement unlocked: Complete 10 morning yoga classes → Badge unlocked 🌟', 'Achievement');
            }
        }
    }, 8000);
}

function addStartingSoonAnimations() {
    // Add starting soon class to first card
    const firstCard = document.querySelector('.class-card[data-class-id="1"]');
    if (firstCard) {
        const joinBtn = firstCard.querySelector('.action-btn.primary');
        if (joinBtn) {
            joinBtn.classList.add('starting-soon');
        }
    }
}

function createConfettiBurst(element) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-burst';
    
    // Create confetti pieces
    for (let i = 0; i < 5; i++) {
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

function openClassModal(className, instructorName, instructorTitle, instructorAvatar) {
    const modal = document.getElementById('classModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalInstructorName = document.getElementById('modalInstructorName');
    const modalInstructorTitle = document.getElementById('modalInstructorTitle');
    const modalInstructorAvatar = document.getElementById('modalInstructorAvatar');
    
    if (modalTitle) modalTitle.textContent = className;
    if (modalInstructorName) modalInstructorName.textContent = instructorName;
    if (modalInstructorTitle) modalInstructorTitle.textContent = instructorTitle;
    if (modalInstructorAvatar) modalInstructorAvatar.textContent = instructorAvatar;
    
    // Update benefits and requirements based on class
    updateModalContent(className);
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeClassModal() {
    const modal = document.getElementById('classModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateModalContent(className) {
    const benefitsList = document.getElementById('modalBenefits');
    const requirementsList = document.getElementById('modalRequirements');
    
    if (!benefitsList || !requirementsList) return;
    
    const classData = {
        'Yoga for Flexibility': {
            benefits: [
                'Improved flexibility and range of motion',
                'Reduced muscle tension and stress',
                'Better posture and body awareness',
                'Enhanced relaxation and mindfulness'
            ],
            requirements: [
                'Yoga mat or comfortable surface',
                'Water bottle',
                'Comfortable clothing',
                'Quiet, calm space'
            ]
        },
        'Mindful Breathing': {
            benefits: [
                'Reduced stress and anxiety',
                'Improved focus and concentration',
                'Better sleep quality',
                'Enhanced emotional regulation'
            ],
            requirements: [
                'Comfortable seated position',
                'Quiet environment',
                'Open mind and willingness to practice',
                'No special equipment needed'
            ]
        },
        'Stress Relief': {
            benefits: [
                'Advanced stress management techniques',
                'Improved resilience and coping skills',
                'Better emotional balance',
                'Enhanced mental clarity'
            ],
            requirements: [
                'Yoga mat',
                'Comfortable clothing',
                'Water bottle',
                'Dedicated practice space'
            ]
        }
    };
    
    const data = classData[className] || classData['Yoga for Flexibility'];
    
    benefitsList.innerHTML = data.benefits.map(benefit => `<li>${benefit}</li>`).join('');
    requirementsList.innerHTML = data.requirements.map(req => `<li>${req}</li>`).join('');
}

function clearNotificationFlags() {
    // Clear notification flags when leaving classes page
    localStorage.removeItem('zenpose_classes_notifications_shown');
    localStorage.removeItem('zenpose_achievement_shown');
}

function showClassStartingNotification(className, timeRemaining) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.class-starting-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'class-starting-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">⏰</div>
            <div>
                <div class="notification-text">${className} starts in ${timeRemaining}!</div>
                <div class="notification-time">Get ready for your session</div>
            </div>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
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
