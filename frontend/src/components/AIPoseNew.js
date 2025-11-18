import toast from './Toast.js';
import { createZenPoseLogo } from './ZenPoseLogo.js';

export function renderAIPoseNew(app) {
    // Set current page
    localStorage.setItem('zenpose_current_page', 'ai-pose');
    
    app.innerHTML = `
        <div class="dashboard">
            <!-- Top Navigation Bar -->
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo-section">
                        <div class="logo-circle zenpose-logo" id="aipose-new-logo">
                            <!-- ZenPose logo will be inserted here -->
                        </div>
                        <h1 class="brand-name">ZenPose</h1>
                    </div>
                </div>
                
                <div class="nav-center">
                    <div class="greeting-section">
                        <h2 class="greeting-text">Good Evening, <span id="navUserName">User</span> 👋</h2>
                        <p class="current-date" id="currentDate">Today is a perfect day for mindfulness</p>
                    </div>
                </div>
                
                <div class="nav-right">
                    <button class="theme-toggle-btn" id="aiPoseThemeToggleBtn">
                        <div class="theme-icon">🌙</div>
                    </button>
                    <div class="user-menu" id="userMenu">
                        <div class="user-avatar">👤</div>
                        <div class="user-info">
                            <span class="user-name" id="navUserNameDisplay">User</span>
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
                    <a href="#" class="sidebar-item active" data-section="ai-pose">
                        <span class="sidebar-icon">🤖</span>
                        <span class="sidebar-label">AI Pose</span>
                    </a>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="dashboard-main">
                <div class="ai-pose-container">
                    <!-- Header -->
                    <div class="ai-pose-header">
                        <div class="header-left">
                            <div class="header-icons">
                                <span class="header-icon">🧘‍♀️</span>
                                <span class="header-icon">✨</span>
                            </div>
                            <div class="header-content">
                                <h1 class="ai-pose-title">AI Pose Assistant</h1>
                                <p class="ai-pose-subtitle">Upload your pose and get instant AI feedback with personalized corrections</p>
                            </div>
                        </div>
                        <button class="back-to-dashboard-btn" id="backToDashboard">
                            <span class="back-icon">←</span>
                            <span>Back to Dashboard</span>
                        </button>
                    </div>

                    <!-- Main Grid Layout -->
                    <div class="ai-pose-main-grid">
                        <!-- Left Column -->
                        <div class="main-content-column">
                            <!-- Pose Selection -->
                            <div class="pose-selection-section">
                                <h2 class="section-title">Select Your Pose</h2>
                                <div class="pose-cards-grid" id="poseCardsGrid">
                                    <!-- Pose cards will be dynamically generated -->
                                </div>
                            </div>

                            <!-- Reference Video Section -->
                            <div class="reference-video-section">
                                <div class="video-header">
                                    <h3 class="video-title">Reference Pose Video</h3>
                                    <div class="video-info">
                                        <span class="pose-badge" id="selectedPoseBadge">Select a Pose</span>
                                        <span class="video-duration" id="videoDuration">0:00 / 0:00</span>
                                    </div>
                                </div>
                                
                                <div class="video-container" id="videoContainer">
                                    <div class="video-placeholder" id="videoPlaceholder">
                                        <div class="placeholder-icon">🎯</div>
                                        <p class="placeholder-text">Choose a Pose to Begin</p>
                                        <p class="placeholder-subtext">Select any pose from above to see the demonstration video</p>
                                        <div class="placeholder-status">
                                            <span class="status-text">No Pose Selected</span>
                                            <button class="select-btn" id="selectBtn">SELECT</button>
                                        </div>
                                    </div>
                                    <!-- Intro Video (hidden by default) -->
                                    <video id="introVideo" class="reference-video" style="display: none;" preload="metadata">
                                        <source src="/assets/intro-video.mp4" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                    <!-- Main Reference Video -->
                                    <video id="referenceVideo" class="reference-video" controls style="display: none;" preload="metadata">
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>

                            <!-- Choose Input Method -->
                            <div class="input-method-section">
                                <h3 class="input-method-title">Choose Input Method</h3>
                                <div class="input-method-buttons">
                                    <button class="input-method-btn" id="liveCameraBtn">
                                        <span class="method-icon">📹</span>
                                        <span>Live Camera</span>
                                    </button>
                                    <button class="input-method-btn active" id="uploadMediaBtn">
                                        <span class="method-icon">📁</span>
                                        <span>Upload Media</span>
                    </button>
                                </div>
                            </div>

                            <!-- Your Pose Upload Area -->
                            <div class="your-pose-section">
                                <div class="your-pose-header">
                                    <h3 class="your-pose-title">Your Pose</h3>
                                    <span class="ready-status" id="readyStatus">Ready</span>
                                </div>
                                <div class="upload-area-large" id="uploadAreaLarge">
                                    <div class="upload-content-large" id="uploadContentLarge">
                                        <div class="upload-icon-large" id="uploadIconLarge">📁</div>
                                        <p class="upload-text-large" id="uploadTextLarge">Drop your video file here</p>
                                        <p class="upload-subtext-large" id="uploadSubtextLarge">or click to browse</p>
                                    </div>
                                    <input type="file" id="fileInput" accept="video/*,image/*" style="display: none;">
                                </div>
                            </div>

                            <!-- Start Detection Button -->
                            <div class="detection-button-section">
                                <button class="start-detection-btn-large" id="startDetectionBtn" disabled>
                                    <span class="btn-icon">🎯</span>
                                    <span class="btn-text">Start Detection</span>
                                </button>
                            </div>
                        </div>

                        <!-- Right Column - Analysis Panels -->
                        <div class="analysis-column">
                            <!-- Pose Analysis Panel -->
                            <div class="analysis-panel pose-analysis-panel">
                                <h3 class="panel-title">Pose Analysis</h3>
                                <div class="accuracy-display">
                                    <div class="accuracy-circle">
                                        <svg class="accuracy-svg" width="120" height="120" viewBox="0 0 120 120">
                                            <circle cx="60" cy="60" r="50" fill="none" stroke="#374151" stroke-width="8"/>
                                            <circle id="accuracyProgress" cx="60" cy="60" r="50" fill="none" stroke="#3b82f6" stroke-width="8" 
                                                    stroke-linecap="round" stroke-dasharray="314.16" stroke-dashoffset="314.16" 
                                                    transform="rotate(-90 60 60)" class="transition-all duration-1000"/>
                                        </svg>
                                        <div class="accuracy-text">
                                            <span id="accuracyPercentage" class="accuracy-number">0%</span>
                                            <span class="accuracy-label">Accuracy Score</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Instructions Panel -->
                            <div class="analysis-panel instructions-panel">
                                <div class="panel-header">
                                    <span class="panel-icon">📋</span>
                                    <h3 class="panel-title">Instructions</h3>
                                </div>
                                <div class="instructions-content" id="instructionsContent">
                                    <div class="instructions-placeholder">
                                        <div class="instruction-icon">📋</div>
                                        <p class="instruction-title">Select a Pose</p>
                                        <p class="instruction-text">Choose any pose from the grid above to see detailed step-by-step instructions here.</p>
                                        <div class="instruction-tip">
                                            <span class="tip-icon">💡</span>
                                            <span class="tip-text">Tip:</span>
                                            <p class="tip-content">Click on any pose card above to see its benefits, instructions, and difficulty level.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Real-time Feedback Panel -->
                            <div class="analysis-panel feedback-panel">
                                <div class="panel-header">
                                    <span class="panel-icon">🎯</span>
                                    <h3 class="panel-title">Real-time Feedback</h3>
                                </div>
                                <div class="feedback-content" id="feedbackContent">
                                    <div class="feedback-item good">
                                        <span class="feedback-icon">✓</span>
                                        <span class="feedback-text">Good spine alignment</span>
                                    </div>
                                    <div class="feedback-item warning">
                                        <span class="feedback-icon">⚠</span>
                                        <span class="feedback-text">Adjust arm position</span>
                                    </div>
                                    <div class="feedback-item info">
                                        <span class="feedback-icon">💡</span>
                                        <span class="feedback-text">Focus on breathing</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Connections Panel -->
                            <div class="analysis-panel connections-panel">
                                <div class="panel-header">
                                    <span class="panel-icon">⚡</span>
                                    <span class="panel-title">Connections</h3>
                                </div>
                                <div class="connections-content">
                                    <div class="connection-item">
                                        <span class="connection-icon">🎥</span>
                                        <div class="connection-text">
                                            <p>Upload a video to get started and see how your pose compared!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pose Mastery Panel -->
                            <div class="analysis-panel mastery-panel">
                                <h3 class="panel-title">Pose Mastery</h3>
                                <div class="mastery-content">
                                    <div class="progress-item">
                                        <span class="progress-label">Progress</span>
                                        <span class="progress-value">75%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 75%"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Achievements Panel -->
                            <div class="analysis-panel achievements-panel">
                                <h3 class="panel-title">Achievements</h3>
                                <div class="achievements-content">
                                    <div class="achievement-item">
                                        <span class="achievement-icon">🏆</span>
                                        <span class="achievement-label">Beginner</span>
                                    </div>
                                    <div class="achievement-item">
                                        <span class="achievement-icon">🥉</span>
                                        <span class="achievement-label">Intermediate</span>
                                    </div>
                                    <div class="achievement-item">
                                        <span class="achievement-icon">🥇</span>
                                        <span class="achievement-label">Master</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;

    // Initialize the component
    setupAIPoseNewEvents();
    loadUserData();
    initializePoses();
    
    // Initialize ZenPose logo
    setTimeout(() => {
        const logoContainer = document.querySelector('#aipose-new-logo');
        if (logoContainer) {
            logoContainer.innerHTML = '';
            const zenposeLogo = createZenPoseLogo('w-12 h-12');
            logoContainer.appendChild(zenposeLogo);
        }
    }, 0);
}

// Custom intro video URL - properly located in public/assets/
const INTRO_VIDEO_URL = '/assets/intro-video.mp4';

// Pose data with aesthetic stick figure SVG icons
const poses = [
    {
        id: 'childs',
        title: "Child's Pose",
        difficulty: 'BEGINNER',
        svgIcon: `
            <svg viewBox="0 0 100 100" class="pose-svg">
                <g stroke="#3b82f6" stroke-width="3" fill="none" stroke-linecap="round">
                    <!-- Head -->
                    <circle cx="50" cy="25" r="8" fill="#3b82f6" opacity="0.8"/>
                    <!-- Body curved down -->
                    <path d="M50 33 Q50 45 45 55 Q40 65 35 70" stroke-width="4"/>
                    <!-- Arms extended forward -->
                    <path d="M45 50 Q35 52 25 55"/>
                    <path d="M45 50 Q35 48 25 45"/>
                    <!-- Legs folded -->
                    <path d="M40 65 Q45 75 50 80"/>
                    <path d="M40 65 Q35 75 30 80"/>
                    <!-- Ground line -->
                    <line x1="20" y1="85" x2="80" y2="85" stroke="#64748b" stroke-width="2" opacity="0.5"/>
                </g>
            </svg>
        `,
        videoUrl: '/assets/childpose.mp4',
        description: 'A resting pose that stretches the back and shoulders',
        instructions: [
            'Kneel on the floor with big toes touching',
            'Sit back on your heels',
            'Separate knees hip-width apart',
            'Fold forward, extending arms in front',
            'Rest forehead on the ground',
            'Hold for 30 seconds to 3 minutes'
        ],
        duration: '30s - 3min',
        focus: 'Relaxation & Stretching',
        benefits: 'Relieves stress, stretches hips and thighs, calms the mind',
        tips: 'Keep knees comfortable, breathe deeply, avoid if knee injuries'
    },
    {
        id: 'warrior',
        title: "Warrior Pose",
        difficulty: 'INTERMEDIATE',
        svgIcon: `
            <svg viewBox="0 0 100 100" class="pose-svg">
                <g stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round">
                    <!-- Head -->
                    <circle cx="45" cy="20" r="8" fill="#f59e0b" opacity="0.8"/>
                    <!-- Body -->
                    <line x1="45" y1="28" x2="45" y2="55" stroke-width="4"/>
                    <!-- Arms extended -->
                    <path d="M20 40 L45 45 L75 35"/>
                    <!-- Front leg bent -->
                    <path d="M45 55 Q40 70 35 80"/>
                    <!-- Back leg straight -->
                    <path d="M45 55 Q55 70 65 80"/>
                    <!-- Feet -->
                    <ellipse cx="35" cy="82" rx="4" ry="2" fill="#f59e0b" opacity="0.6"/>
                    <ellipse cx="65" cy="82" rx="4" ry="2" fill="#f59e0b" opacity="0.6"/>
                    <!-- Ground line -->
                    <line x1="20" y1="85" x2="80" y2="85" stroke="#64748b" stroke-width="2" opacity="0.5"/>
                </g>
            </svg>
        `,
        videoUrl: '/assets/warriorpose.mp4',
        description: 'A standing pose that builds strength and stability',
        instructions: [
            'Stand with feet 3-4 feet apart',
            'Turn right foot out 90 degrees',
            'Bend right knee over ankle',
            'Extend arms parallel to floor',
            'Gaze over right fingertips',
            'Hold for 30 seconds, repeat other side'
        ],
        duration: '30s - 1min each side',
        focus: 'Strength & Balance',
        benefits: 'Strengthens legs, improves balance, builds confidence',
        tips: 'Keep front knee aligned over ankle, engage core muscles'
    },
    {
        id: 'cobra',
        title: "Cobra Pose",
        difficulty: 'BEGINNER',
        svgIcon: `
            <svg viewBox="0 0 100 100" class="pose-svg">
                <g stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round">
                    <!-- Head -->
                    <circle cx="30" cy="25" r="8" fill="#22c55e" opacity="0.8"/>
                    <!-- Curved spine -->
                    <path d="M30 33 Q40 45 50 50 Q60 55 70 60" stroke-width="4"/>
                    <!-- Arms supporting -->
                    <path d="M35 45 L25 55"/>
                    <path d="M45 50 L35 60"/>
                    <!-- Lower body on ground -->
                    <path d="M70 60 Q75 65 80 70"/>
                    <path d="M70 60 Q75 70 80 75"/>
                    <!-- Ground line -->
                    <line x1="20" y1="80" x2="85" y2="80" stroke="#64748b" stroke-width="2" opacity="0.5"/>
                </g>
            </svg>
        `,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description: 'A backbend that strengthens the spine and opens the chest',
        instructions: [
            'Lie face down on the mat',
            'Place palms under shoulders',
            'Press pubic bone into floor',
            'Lift chest using back muscles',
            'Keep shoulders away from ears',
            'Hold for 15-30 seconds'
        ],
        duration: '15s - 30s',
        focus: 'Back Strength & Flexibility',
        benefits: 'Strengthens spine, opens chest, improves posture',
        tips: 'Use back muscles, not arms to lift, keep hips grounded'
    },
    {
        id: 'plank',
        title: "Plank",
        difficulty: 'INTERMEDIATE',
        svgIcon: `
            <svg viewBox="0 0 100 100" class="pose-svg">
                <g stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round">
                    <!-- Head -->
                    <circle cx="25" cy="35" r="8" fill="#f59e0b" opacity="0.8"/>
                    <!-- Straight body line -->
                    <line x1="25" y1="43" x2="75" y2="43" stroke-width="4"/>
                    <!-- Arms -->
                    <line x1="25" y1="43" x2="15" y2="55"/>
                    <line x1="35" y1="43" x2="25" y2="55"/>
                    <!-- Legs -->
                    <line x1="65" y1="43" x2="60" y2="60"/>
                    <line x1="75" y1="43" x2="70" y2="60"/>
                    <!-- Support points -->
                    <ellipse cx="20" cy="57" rx="3" ry="2" fill="#f59e0b" opacity="0.6"/>
                    <ellipse cx="65" cy="62" rx="3" ry="2" fill="#f59e0b" opacity="0.6"/>
                    <!-- Ground line -->
                    <line x1="10" y1="65" x2="80" y2="65" stroke="#64748b" stroke-width="2" opacity="0.5"/>
                </g>
            </svg>
        `,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description: 'A core strengthening pose that builds full-body stability',
        instructions: [
            'Start in push-up position',
            'Keep body in straight line',
            'Engage core muscles',
            'Keep shoulders over wrists',
            'Breathe steadily',
            'Hold for 30 seconds to 2 minutes'
        ],
        duration: '30s - 2min',
        focus: 'Core Strength & Stability',
        benefits: 'Strengthens core, improves posture, builds endurance',
        tips: 'Keep hips level, engage entire core, modify on knees if needed'
    },
    {
        id: 'tree',
        title: "Tree Pose",
        difficulty: 'BEGINNER',
        svgIcon: `
            <svg viewBox="0 0 100 100" class="pose-svg">
                <g stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round">
                    <!-- Head -->
                    <circle cx="50" cy="20" r="8" fill="#22c55e" opacity="0.8"/>
                    <!-- Body -->
                    <line x1="50" y1="28" x2="50" y2="60" stroke-width="4"/>
                    <!-- Arms in prayer position -->
                    <path d="M40 35 Q50 30 60 35" stroke-width="2"/>
                    <path d="M45 40 Q50 35 55 40" stroke-width="2"/>
                    <!-- Standing leg -->
                    <line x1="50" y1="60" x2="50" y2="80"/>
                    <!-- Bent leg -->
                    <path d="M50 55 Q60 50 65 45"/>
                    <path d="M65 45 Q60 55 55 60"/>
                    <!-- Standing foot -->
                    <ellipse cx="50" cy="82" rx="6" ry="3" fill="#22c55e" opacity="0.6"/>
                    <!-- Ground line -->
                    <line x1="30" y1="85" x2="70" y2="85" stroke="#64748b" stroke-width="2" opacity="0.5"/>
                </g>
            </svg>
        `,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        description: 'A balancing pose that improves focus and stability',
        instructions: [
            'Stand tall with feet hip-width apart',
            'Shift weight to left foot',
            'Place right foot on inner left thigh',
            'Press foot into leg, leg into foot',
            'Bring palms together at heart center',
            'Hold for 30 seconds, switch sides'
        ],
        duration: '30s - 1min each side',
        focus: 'Balance & Concentration',
        benefits: 'Improves balance, strengthens legs, enhances focus',
        tips: 'Avoid placing foot on side of knee, use wall for support if needed'
    }
];

// State management
let selectedPose = null;
let currentInputMethod = 'upload'; // 'upload' or 'camera'
let videoTimer = null;
let isPlayingIntro = false;
let totalVideoDuration = 0; // Store total duration to prevent timer flickering

function initializePoses() {
    const poseGrid = document.getElementById('poseCardsGrid');
    if (!poseGrid) return;
    
    poseGrid.innerHTML = '';
    
    poses.forEach((pose, index) => {
        const poseCard = document.createElement('div');
        poseCard.className = 'pose-card';
        poseCard.innerHTML = `
            <div class="pose-card-content">
                <div class="pose-icon-container">
                    ${pose.svgIcon}
                </div>
                <h3 class="pose-name">${pose.title}</h3>
                <span class="pose-difficulty ${pose.difficulty.toLowerCase()}">${pose.difficulty}</span>
            </div>
        `;
        
        poseCard.addEventListener('click', () => selectPose(pose, poseCard));
        poseGrid.appendChild(poseCard);
    });
}

function selectPose(pose, cardElement) {
    console.log('Selecting pose:', pose.title);
    selectedPose = pose;
    
    // Update card selection
    document.querySelectorAll('.pose-card').forEach(card => {
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');
    
    // Update all UI elements
    updateReferenceVideo();
    updateInstructions();
    updatePoseInfo();
    
    // Add selection animation
    cardElement.style.animation = 'scale-in 0.3s ease-out';
    setTimeout(() => {
        cardElement.style.animation = '';
    }, 300);
}

function updateReferenceVideo() {
    if (!selectedPose) return;
    
    const introVideo = document.getElementById('introVideo');
    const mainVideo = document.getElementById('referenceVideo');
    const placeholder = document.getElementById('videoPlaceholder');
    const duration = document.getElementById('videoDuration');
    
    if (!introVideo || !mainVideo) return;
    
    // Show loading state
    if (placeholder) {
        placeholder.style.display = 'flex';
        placeholder.innerHTML = `
            <div class="placeholder-icon animate-pulse">
                <div class="pose-icon-container">
                    ${selectedPose.svgIcon}
                </div>
            </div>
            <p class="placeholder-text">Loading ${selectedPose.title} demonstration...</p>
            <p class="placeholder-subtext">Preparing custom intro video with fade animation...</p>
        `;
    }
    
    // Hide both videos initially
    introVideo.style.display = 'none';
    mainVideo.style.display = 'none';
    
    // Setup intro video - using the source element for better compatibility
    introVideo.innerHTML = `<source src="${INTRO_VIDEO_URL}" type="video/mp4">Your browser does not support the video tag.`;
    introVideo.muted = false;
    introVideo.controls = false; // No controls for intro
    introVideo.load(); // Force reload
    
    // Setup main video
    mainVideo.src = selectedPose.videoUrl;
    mainVideo.controls = true;
    
    // Load intro video first
    introVideo.onloadeddata = () => {
        console.log('Custom intro video with fade animation loaded successfully');
        
        // Then load main video
        mainVideo.onloadeddata = () => {
            console.log('Main video loaded successfully');
            
            // Calculate and store total duration to prevent flickering
            totalVideoDuration = (introVideo.duration || 0) + (mainVideo.duration || 0);
            if (duration) {
                duration.textContent = `0:00 / ${formatTime(totalVideoDuration)}`;
            }
            
            // Start playing intro video
            setTimeout(() => {
                startVideoSequence();
            }, 1000);
        };
        
        mainVideo.onerror = () => {
            console.error('Main video failed to load');
            // Still play intro even if main video fails
            setTimeout(() => {
                startVideoSequence();
            }, 1000);
        };
    };
    
    introVideo.onerror = (e) => {
        console.error('Custom intro video failed to load:', e);
        console.log('Attempting fallback to main video only');
        // If intro fails, play main video directly
        setTimeout(() => {
            if (placeholder) placeholder.style.display = 'none';
            mainVideo.style.display = 'block';
            setupVideoTimer(mainVideo);
        }, 1000);
    };
    
    // Also handle canplaythrough event for better reliability
    introVideo.oncanplaythrough = () => {
        console.log('Intro video can play through');
    };
}

function startVideoSequence() {
    const introVideo = document.getElementById('introVideo');
    const mainVideo = document.getElementById('referenceVideo');
    const placeholder = document.getElementById('videoPlaceholder');
    
    if (!introVideo || !mainVideo) return;
    
    // Hide placeholder and show intro video
    if (placeholder) placeholder.style.display = 'none';
    
    isPlayingIntro = true;
    introVideo.style.display = 'block';
    mainVideo.style.display = 'none';
    
    // Setup intro video timer
    setupVideoTimer(introVideo, true);
    
    // Play intro video
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Intro video started playing successfully');
        }).catch(error => {
            console.error('Error playing custom intro video:', error);
            // If intro fails to play, skip to main video
            playMainVideo();
        });
    }
    
    // When intro video ends, play main video
    introVideo.onended = () => {
        console.log('Custom intro video with fade animation ended, switching to main video');
        playMainVideo();
    };
    
    // Remove click handler - only skip button should work
    introVideo.onclick = null;
    
    // Add visual indicator that intro can be skipped
    addSkipIntroIndicator();
}

function playMainVideo() {
    const introVideo = document.getElementById('introVideo');
    const mainVideo = document.getElementById('referenceVideo');
    
    if (!introVideo || !mainVideo) return;
    
    // Stop and reset intro video to prevent audio continuation
    introVideo.pause();
    introVideo.currentTime = 0;
    
    // Hide intro video and show main video
    isPlayingIntro = false;
    introVideo.style.display = 'none';
    mainVideo.style.display = 'block';
    
    // Remove skip indicator
    removeSkipIntroIndicator();
    
    // Setup main video timer
    setupVideoTimer(mainVideo, false);
    
    // Auto-play main video
    const playPromise = mainVideo.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Main video started playing successfully');
        }).catch(error => {
            console.log('Auto-play prevented, user interaction required:', error);
        });
    }
}

function addSkipIntroIndicator() {
    const videoContainer = document.getElementById('videoContainer');
    if (!videoContainer) return;
    
    // Remove existing indicator
    const existing = videoContainer.querySelector('.skip-intro-indicator');
    if (existing) existing.remove();
    
    // Add skip intro button positioned at bottom right
    const skipIndicator = document.createElement('div');
    skipIndicator.className = 'skip-intro-indicator';
    skipIndicator.innerHTML = `
        <button class="skip-intro-btn" onclick="playMainVideo()">
            <span class="skip-icon">⏭️</span>
            <span class="skip-text">Skip Intro</span>
        </button>
    `;
    
    videoContainer.appendChild(skipIndicator);
}

function removeSkipIntroIndicator() {
    const indicator = document.querySelector('.skip-intro-indicator');
    if (indicator) indicator.remove();
}

function setupVideoTimer(video, isIntro = false) {
    const duration = document.getElementById('videoDuration');
    
    // Clear existing timer
    if (videoTimer) {
        clearInterval(videoTimer);
    }
    
    // Update timer function with stable display
    function updateTimer() {
        if (video && duration && !isNaN(video.duration)) {
            let currentTime;
            
            if (isIntro) {
                // For intro video, show current intro time but maintain total duration
                currentTime = formatTime(video.currentTime);
                duration.textContent = `${currentTime} / ${formatTime(totalVideoDuration)}`;
            } else {
                // For main video, show offset time (intro duration + current main video time)
                const introVideo = document.getElementById('introVideo');
                const introDuration = introVideo && !isNaN(introVideo.duration) ? introVideo.duration : 0;
                const offsetCurrentTime = introDuration + video.currentTime;
                currentTime = formatTime(offsetCurrentTime);
                duration.textContent = `${currentTime} / ${formatTime(totalVideoDuration)}`;
            }
        }
    }
    
    // Set up event listeners for video
    video.addEventListener('timeupdate', updateTimer);
    video.addEventListener('loadedmetadata', updateTimer);
    video.addEventListener('play', updateTimer);
    video.addEventListener('pause', updateTimer);
    video.addEventListener('seeked', updateTimer);
    
    // Fallback timer that updates every second
    videoTimer = setInterval(() => {
        if (video && !video.paused && !video.ended) {
            updateTimer();
        }
    }, 1000);
    
    // Initial update
    updateTimer();
}

function updateInstructions() {
    if (!selectedPose) return;
    
    const instructionsContainer = document.getElementById('instructionsContent');
    
    if (instructionsContainer) {
        const instructionsList = selectedPose.instructions.map((step, index) => 
            `<div class="instruction-step">
                <span class="step-number">${index + 1}</span>
                <span class="step-text">${step}</span>
            </div>`
        ).join('');
        
        instructionsContainer.innerHTML = `
            <div class="pose-instructions">
                <h4 class="instructions-title">${selectedPose.title} Steps:</h4>
                <div class="steps-list">
                    ${instructionsList}
                </div>
                <div class="pose-details">
                    <div class="detail-row">
                        <span class="detail-label">Duration:</span>
                        <span class="detail-value">${selectedPose.duration}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Focus:</span>
                        <span class="detail-value">${selectedPose.focus}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

function updatePoseInfo() {
    if (!selectedPose) return;
    
    const poseBadge = document.getElementById('selectedPoseBadge');
    
    if (poseBadge) poseBadge.textContent = selectedPose.title;
}

function updateUploadAreaForInputMethod() {
    const uploadIcon = document.getElementById('uploadIconLarge');
    const uploadText = document.getElementById('uploadTextLarge');
    const uploadSubtext = document.getElementById('uploadSubtextLarge');
    const btnText = document.querySelector('.btn-text');
    
    console.log('Updating upload area for method:', currentInputMethod);
    
    if (currentInputMethod === 'camera') {
        // Live Camera mode
        if (uploadIcon) {
            uploadIcon.textContent = '📹';
            console.log('Set camera icon: 📹');
        }
        if (uploadText) {
            uploadText.textContent = 'Click to start live camera';
            console.log('Set camera text');
        }
        if (uploadSubtext) {
            uploadSubtext.textContent = 'Position yourself in front of the camera';
            console.log('Set camera subtext');
        }
        if (btnText) {
            btnText.textContent = 'Start Live Detection';
        }
    } else {
        // Upload Media mode
        if (uploadIcon) {
            uploadIcon.textContent = '📁';
            console.log('Set upload icon: 📁');
        }
        if (uploadText) {
            uploadText.textContent = 'Drop your video file here';
            console.log('Set upload text');
        }
        if (uploadSubtext) {
            uploadSubtext.textContent = 'or click to browse';
            console.log('Set upload subtext');
        }
        if (btnText) {
            btnText.textContent = 'Start Detection';
        }
    }
}

function setupAIPoseNewEvents() {
    // Back to dashboard
    const backBtn = document.getElementById('backToDashboard');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Clear video timer when leaving page
            if (videoTimer) {
                clearInterval(videoTimer);
                videoTimer = null;
            }
            localStorage.setItem('zenpose_current_page', 'dashboard');
            window.location.reload();
        });
    }

    // Sidebar navigation
    setupSidebarNavigation();
    
    // User menu dropdown
    setupUserMenu();
    
    // Theme toggle
    setupThemeToggle();

    // Input method buttons
    const liveCameraBtn = document.getElementById('liveCameraBtn');
    const uploadMediaBtn = document.getElementById('uploadMediaBtn');
    
    if (liveCameraBtn && uploadMediaBtn) {
        liveCameraBtn.addEventListener('click', () => {
            console.log('Live Camera button clicked');
            currentInputMethod = 'camera';
            liveCameraBtn.classList.add('active');
            uploadMediaBtn.classList.remove('active');
            
            // Reset upload area first, then update
            resetUpload();
            setTimeout(() => {
                updateUploadAreaForInputMethod();
            }, 50);
            
            toast.info('Live Camera mode selected', 'Input Method');
        });
        
        uploadMediaBtn.addEventListener('click', () => {
            console.log('Upload Media button clicked');
            currentInputMethod = 'upload';
            uploadMediaBtn.classList.add('active');
            liveCameraBtn.classList.remove('active');
            
            // Reset upload area first, then update
            resetUpload();
            setTimeout(() => {
                updateUploadAreaForInputMethod();
            }, 50);
            
            toast.info('Upload Media mode selected', 'Input Method');
        });
    }

    // File upload
    const uploadArea = document.getElementById('uploadAreaLarge');
    const fileInput = document.getElementById('fileInput');
    const startBtn = document.getElementById('startDetectionBtn');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => {
            if (currentInputMethod === 'upload') {
                fileInput.click();
            } else {
                // Handle live camera start
                startLiveCamera();
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && currentInputMethod === 'upload') {
                handleFileUpload(file);
                if (startBtn) startBtn.disabled = false;
            }
        });
        
        // Drag and drop (only for upload mode)
        uploadArea.addEventListener('dragover', (e) => {
            if (currentInputMethod === 'upload') {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            }
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            if (currentInputMethod === 'upload') {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleFileUpload(files[0]);
                    if (startBtn) startBtn.disabled = false;
                }
            }
        });
    }

    // Start detection
    if (startBtn) {
        startBtn.addEventListener('click', startPoseDetection);
    }
    
    // Initialize upload area for default method
    setTimeout(() => {
        updateUploadAreaForInputMethod();
    }, 100);
    
    // Cleanup timer when page is unloaded
    window.addEventListener('beforeunload', () => {
        if (videoTimer) {
            clearInterval(videoTimer);
            videoTimer = null;
        }
    });
}

function startLiveCamera() {
    const uploadArea = document.getElementById('uploadAreaLarge');
    const startBtn = document.getElementById('startDetectionBtn');
    
    if (!uploadArea) return;
    
    // Show camera starting state
    uploadArea.innerHTML = `
        <div class="camera-starting">
            <div class="camera-icon-large animate-pulse">📹</div>
            <p class="camera-text-large">Starting camera...</p>
            <p class="camera-subtext-large">Please allow camera access</p>
        </div>
    `;
    
    // Simulate camera access (in real implementation, use navigator.mediaDevices.getUserMedia)
    setTimeout(() => {
        uploadArea.innerHTML = `
            <div class="camera-active">
                <div class="camera-icon-large">📹</div>
                <p class="camera-text-large">Camera Active</p>
                <p class="camera-subtext-large">Position yourself for pose detection</p>
                <div class="camera-preview">
                    <div class="camera-placeholder">Live Camera Feed</div>
                </div>
            </div>
        `;
        
        if (startBtn) startBtn.disabled = false;
        toast.success('Camera started successfully!', 'Live Camera');
    }, 2000);
}

function handleFileUpload(file) {
    const uploadArea = document.getElementById('uploadAreaLarge');
    const readyStatus = document.getElementById('readyStatus');
    
    if (!uploadArea) return;
    
    uploadArea.innerHTML = `
        <div class="file-uploaded-large">
            <div class="file-icon-large">${file.type.startsWith('video/') ? '🎥' : '🖼️'}</div>
            <div class="file-info-large">
                <p class="file-name-large">${file.name}</p>
                <span class="file-size-large">${(file.size / 1024 / 1024).toFixed(1)} MB</span>
            </div>
            <button class="remove-file-large" onclick="resetUpload()">×</button>
        </div>
    `;
    
    if (readyStatus) {
        readyStatus.textContent = 'Ready';
        readyStatus.style.color = '#22c55e';
    }
    
    toast.success('File uploaded successfully!', 'Upload');
}

function resetUpload() {
    const uploadArea = document.getElementById('uploadAreaLarge');
    const startBtn = document.getElementById('startDetectionBtn');
    const readyStatus = document.getElementById('readyStatus');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea) {
        // Reset to basic structure first
        uploadArea.innerHTML = `
            <div class="upload-content-large" id="uploadContentLarge">
                <div class="upload-icon-large" id="uploadIconLarge">📁</div>
                <p class="upload-text-large" id="uploadTextLarge">Drop your video file here</p>
                <p class="upload-subtext-large" id="uploadSubtextLarge">or click to browse</p>
            </div>
            <input type="file" id="fileInput" accept="video/*,image/*" style="display: none;">
        `;
        
        // Re-setup file input events
        const newFileInput = document.getElementById('fileInput');
        if (newFileInput) {
            newFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && currentInputMethod === 'upload') {
                    handleFileUpload(file);
                    if (startBtn) startBtn.disabled = false;
                }
            });
        }
    }
    
    if (fileInput) fileInput.value = '';
    if (startBtn) startBtn.disabled = true;
    if (readyStatus) {
        readyStatus.textContent = 'Ready';
        readyStatus.style.color = '#94a3b8';
    }
}

async function startPoseDetection() {
    const startBtn = document.getElementById('startDetectionBtn');
    
    if (!selectedPose) {
        toast.show('Please select a pose first', 'error');
        return;
    }
    
    // Check requirements based on input method
    if (currentInputMethod === 'upload') {
        const fileInput = document.getElementById('fileInput');
        if (!fileInput || !fileInput.files[0]) {
            toast.show('Please upload a video first', 'error');
            return;
        }
    }
    
    if (startBtn) {
        startBtn.innerHTML = '<span class="loading-spinner"></span> Analyzing...';
        startBtn.disabled = true;
    }
    
    try {
        // Simulate demo results
        const mockAccuracy = Math.floor(Math.random() * 30) + 70;
        updateAnalysisResults({
            accuracy_percentage: mockAccuracy,
            feedback: {
                corrections: ['Keep your spine straighter', 'Engage your core muscles more'],
                tips: 'Focus on your breathing and maintain the pose'
            }
        });
        
        const methodText = currentInputMethod === 'camera' ? 'Live camera' : 'Upload';
        toast.show(`${methodText} analysis completed!`, 'success');
        
    } catch (error) {
        console.error('AI Detection Error:', error);
        toast.show(error.message || 'Failed to analyze pose', 'error');
    } finally {
        if (startBtn) {
            const btnText = currentInputMethod === 'camera' ? 'Start Live Detection' : 'Start Detection';
            startBtn.innerHTML = `<span class="btn-icon">🎯</span><span class="btn-text">${btnText}</span>`;
            startBtn.disabled = false;
        }
    }
}

function updateAnalysisResults(result) {
    // Update accuracy circle
    const accuracyProgress = document.getElementById('accuracyProgress');
    const accuracyPercentage = document.getElementById('accuracyPercentage');
    
    if (accuracyProgress && result.accuracy_percentage) {
        const circumference = 2 * Math.PI * 50;
        const offset = circumference - (result.accuracy_percentage / 100) * circumference;
        accuracyProgress.style.strokeDashoffset = offset;
        
        // Color based on accuracy
        if (result.accuracy_percentage >= 80) {
            accuracyProgress.style.stroke = '#10b981'; // green
        } else if (result.accuracy_percentage >= 60) {
            accuracyProgress.style.stroke = '#f59e0b'; // yellow
        } else {
            accuracyProgress.style.stroke = '#ef4444'; // red
        }
    }
    
    if (accuracyPercentage) {
        accuracyPercentage.textContent = `${result.accuracy_percentage || 0}%`;
    }
}

function setupSidebarNavigation() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Clear video timer when navigating away
            if (videoTimer) {
                clearInterval(videoTimer);
                videoTimer = null;
            }
            
            sidebarItems.forEach(sidebarItem => sidebarItem.classList.remove('active'));
            item.classList.add('active');
            
            const section = item.getAttribute('data-section');
            
            if (section === 'home') {
                localStorage.setItem('zenpose_current_page', 'dashboard');
                window.location.reload();
            } else if (section === 'classes') {
                localStorage.setItem('zenpose_current_page', 'classes');
                window.location.reload();
            } else if (section === 'progress') {
                localStorage.setItem('zenpose_current_page', 'progress');
                window.location.reload();
            }
        });
    });
}

function setupUserMenu() {
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
        
        // Navigation handlers
        const profileBtn = document.getElementById('profileBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                if (videoTimer) {
                    clearInterval(videoTimer);
                    videoTimer = null;
                }
                localStorage.setItem('zenpose_current_page', 'profile');
                window.location.reload();
            });
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                if (videoTimer) {
                    clearInterval(videoTimer);
                    videoTimer = null;
                }
                localStorage.setItem('zenpose_current_page', 'settings');
                window.location.reload();
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (videoTimer) {
                    clearInterval(videoTimer);
                    videoTimer = null;
                }
                localStorage.removeItem('zenpose_user');
                localStorage.removeItem('zenpose_user_token');
                localStorage.setItem('zenpose_current_page', 'login');
                window.location.reload();
            });
        }
    }
}

function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('aiPoseThemeToggleBtn');
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('zenpose_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.querySelector('.theme-icon').textContent = '☀️';
        }
        
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            localStorage.setItem('zenpose_theme', isDark ? 'dark' : 'light');
            themeToggleBtn.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
            
            toast.info(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'Theme Changed');
        });
    }
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === null || seconds === undefined) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function loadUserData() {
    const user = JSON.parse(localStorage.getItem('zenpose_user') || '{}');
    console.log('User data loaded:', user);
    
    const userNameElements = document.querySelectorAll('#navUserName, #navUserNameDisplay');
    userNameElements.forEach(element => {
        if (element && user.username) {
            element.textContent = user.username;
        }
    });
    
    const userLevelElements = document.querySelectorAll('#navUserLevel');
    userLevelElements.forEach(element => {
        if (element && user.level) {
            element.textContent = user.level;
        }
    });
}

// Make functions globally available
window.resetUpload = resetUpload;
window.playMainVideo = playMainVideo;