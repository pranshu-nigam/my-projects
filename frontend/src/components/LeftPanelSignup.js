import { createZenPoseLogo } from './ZenPoseLogo.js';

export function createLeftPanelSignup() {
    const leftPanel = document.createElement('div');
    leftPanel.className = 'left-panel';
    
    leftPanel.innerHTML = `
        <div class="left-content">
            <div class="logo-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 2rem;">
                <div class="logo-circle zenpose-logo" id="signup-logo">
                    <!-- ZenPose logo will be inserted here -->
                </div>
            </div>
            <div class="welcome-section">
                <h2 class="welcome-title">Join Us</h2>
                <p class="welcome-tagline">Begin Your Journey to Inner Peace</p>
            </div>
        </div>
    `;
    
    // Add the ZenPose logo after the element is created
    setTimeout(() => {
        console.log('=== ATTEMPTING TO ADD LOGO ===');
        const logoContainer = leftPanel.querySelector('#signup-logo');
        console.log('Logo container found:', logoContainer);
        
        if (logoContainer) {
            console.log('Clearing existing content...');
            logoContainer.innerHTML = '';
            
            console.log('Creating ZenPose logo...');
            const zenposeLogo = createZenPoseLogo('w-20 h-20');
            console.log('Logo created:', zenposeLogo);
            
            console.log('Appending logo to container...');
            logoContainer.appendChild(zenposeLogo);
            console.log('Logo appended. Container children:', logoContainer.children.length);
            
            // Force a style check
            setTimeout(() => {
                const rect = zenposeLogo.getBoundingClientRect();
                console.log('Logo dimensions after append:', rect);
                console.log('Logo computed styles:', window.getComputedStyle(zenposeLogo));
            }, 100);
        } else {
            console.error('Logo container not found!');
        }
    }, 0);
    
    return leftPanel;
}

