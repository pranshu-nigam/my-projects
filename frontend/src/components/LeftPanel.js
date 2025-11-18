import { createZenPoseLogo } from './ZenPoseLogo.js';

export function createLeftPanel() {
    const leftPanel = document.createElement('div');
    leftPanel.className = 'left-panel';
    
    // Add CSS to hide any ZenPose text
    const style = document.createElement('style');
    style.textContent = `
        .left-panel h1.brand-name {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -9999px !important;
        }
        .left-panel .logo-container h1 {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -9999px !important;
        }
        .left-panel *[class*="brand"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }
        .left-panel *:contains("ZenPose") {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Create elements manually to avoid any potential issues
    const leftContent = document.createElement('div');
    leftContent.className = 'left-content';
    
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    logoContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 2rem;';
    
    const logoCircle = document.createElement('div');
    logoCircle.className = 'logo-circle zenpose-logo';
    logoCircle.id = 'login-logo';
    logoCircle.innerHTML = '<!-- ZenPose logo will be inserted here -->';
    
    const welcomeSection = document.createElement('div');
    welcomeSection.className = 'welcome-section';
    
    const welcomeTitle = document.createElement('h2');
    welcomeTitle.className = 'welcome-title';
    welcomeTitle.textContent = 'Welcome Back';
    
    const welcomeTagline = document.createElement('p');
    welcomeTagline.className = 'welcome-tagline';
    welcomeTagline.textContent = 'Begin Your Journey to Inner Peace';
    
    // Assemble the structure
    logoContainer.appendChild(logoCircle);
    welcomeSection.appendChild(welcomeTitle);
    welcomeSection.appendChild(welcomeTagline);
    leftContent.appendChild(logoContainer);
    leftContent.appendChild(welcomeSection);
    leftPanel.appendChild(leftContent);
    
    // Force remove any existing ZenPose text immediately
    setTimeout(() => {
        const allBrandNames = leftPanel.querySelectorAll('h1.brand-name');
        allBrandNames.forEach(element => {
            console.log('Force removing brand-name element:', element);
            element.remove();
        });
        
        // Also remove any text content that might contain "ZenPose"
        const allElements = leftPanel.querySelectorAll('*');
        allElements.forEach(element => {
            if (element.textContent && element.textContent.trim() === 'ZenPose' && element.tagName !== 'SCRIPT') {
                console.log('Force removing ZenPose text element:', element);
                element.remove();
            }
        });
    }, 0);
    
    // Add the ZenPose logo after the element is created
    setTimeout(() => {
        console.log('=== LOGIN PAGE LOGO SETUP ===');
        const logoContainer = leftPanel.querySelector('#login-logo');
        console.log('Login logo container found:', logoContainer);
        
        if (logoContainer) {
            // Clear any existing content
            logoContainer.innerHTML = '';
            console.log('Cleared login logo container');
            
            const zenposeLogo = createZenPoseLogo('w-20 h-20');
            console.log('Created login logo:', zenposeLogo);
            
            logoContainer.appendChild(zenposeLogo);
            console.log('Appended login logo to container');
            
            // Check if there's any text content and remove any "ZenPose" text
            const parentContainer = logoContainer.parentElement;
            console.log('Parent container:', parentContainer);
            console.log('Parent container children:', parentContainer.children);
            
            // Force remove any "ZenPose" text that might be present
            const zenposeTextElements = parentContainer.querySelectorAll('h1.brand-name');
            zenposeTextElements.forEach(element => {
                console.log('Found ZenPose text element, removing:', element);
                element.remove();
            });
            
            // Also check for any text nodes
            const walker = document.createTreeWalker(
                parentContainer,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                if (node.textContent.trim() === 'ZenPose') {
                    console.log('Found ZenPose text node, removing:', node);
                    node.remove();
                }
            }
            
            // Final cleanup - remove any remaining ZenPose text
            setTimeout(() => {
                const allElements = document.querySelectorAll('*');
                allElements.forEach(element => {
                    if (element.textContent && element.textContent.trim() === 'ZenPose' && 
                        element.tagName !== 'SCRIPT' && 
                        element.closest('.left-panel')) {
                        console.log('Final cleanup - removing ZenPose text:', element);
                        element.remove();
                    }
                });
            }, 100);
        } else {
            console.error('Login logo container not found!');
        }
    }, 0);
    
    return leftPanel;
}
