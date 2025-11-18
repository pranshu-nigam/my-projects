export function createZenPoseLogo(className = "w-16 h-16") {
    console.log('=== CREATING ZENPOSE LOGO ===');
    console.log('ClassName:', className);
    
    // Create the logo container with your exact design
    const logoContainer = document.createElement('div');
    
    // Determine size based on className
    let size = '80px'; // default size
    if (className.includes('w-12')) {
        size = '56px'; // dashboard size
    } else if (className.includes('w-20')) {
        size = '120px'; // auth pages size - restored to larger size
    } else if (className.includes('w-16')) {
        size = '64px'; // medium size
    }
    
    // Use inline styles to ensure visibility and prevent CSS conflicts
    logoContainer.style.cssText = `
        width: ${size} !important;
        height: ${size} !important;
        min-width: ${size} !important;
        min-height: ${size} !important;
        background-color: #111111 !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: relative !important;
        z-index: 10 !important;
        overflow: visible !important;
        margin: 0 auto !important;
    `;
    
    // Create the SVG with your exact design
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.cssText = `
        width: 100% !important;
        height: 100% !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        transform: translateY(-2px) !important;
    `;
    
    // Your exact SVG content
    svg.innerHTML = `
      <!-- Outer Circle -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#gradient1)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="280"
        stroke-dashoffset="20"
        class="animate-slow-spin"
      />

      <!-- Lotus Petals -->
      <g>
        <path d="M50 25 C40 35, 40 45, 50 50 C60 45, 60 35, 50 25 Z" fill="url(#gradient2)" opacity="0.8"/>
        <path d="M75 50 C65 40, 55 40, 50 50 C55 60, 65 60, 75 50 Z" fill="url(#gradient2)" opacity="0.8"/>
        <path d="M50 75 C60 65, 60 55, 50 50 C40 55, 40 65, 50 75 Z" fill="url(#gradient2)" opacity="0.8"/>
        <path d="M25 50 C35 60, 45 60, 50 50 C45 40, 35 40, 25 50 Z" fill="url(#gradient2)" opacity="0.8"/>
      </g>

      <!-- Meditation Figure -->
      <g class="animate-breathe">
        <circle cx="50" cy="42" r="6" fill="url(#gradient3)" />
        <ellipse cx="50" cy="55" rx="4" ry="8" fill="url(#gradient3)" />
        <path d="M42 52 Q38 48, 42 45 Q46 48, 42 52" fill="url(#gradient3)" />
        <path d="M58 52 Q62 48, 58 45 Q54 48, 58 52" fill="url(#gradient3)" />
        <path d="M42 62 Q38 66, 42 70 Q50 66, 50 62" fill="url(#gradient3)" />
        <path d="M58 62 Q62 66, 58 70 Q50 66, 50 62" fill="url(#gradient3)" />
      </g>

      <!-- Floating Energy Dots -->
      <circle cx="35" cy="30" r="2" fill="url(#gradient4)" opacity="0.7" class="animate-bounce glow"/>
      <circle cx="65" cy="35" r="1.5" fill="url(#gradient4)" opacity="0.6" class="animate-bounce glow" style="animation-delay:0.3s"/>
      <circle cx="30" cy="65" r="1.8" fill="url(#gradient4)" opacity="0.8" class="animate-bounce glow" style="animation-delay:0.6s"/>
      <circle cx="70" cy="70" r="1.3" fill="url(#gradient4)" opacity="0.5" class="animate-bounce glow" style="animation-delay:0.9s"/>

      <!-- Filters & Gradients -->
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="50%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>

        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34d399" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.6" />
        </linearGradient>

        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#e5e7eb" />
        </linearGradient>

        <radialGradient id="gradient4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fbbf24" />
          <stop offset="100%" stop-color="#f59e0b" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;
    
    logoContainer.appendChild(svg);
    
    console.log('=== SVG LOGO CREATED ===');
    console.log('Container:', logoContainer);
    console.log('SVG element:', svg);
    console.log('SVG children count:', svg.children.length);
    
    return logoContainer;
}
