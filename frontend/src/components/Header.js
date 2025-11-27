export function createHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    
    header.innerHTML = `
        <div class="header-content">
            <div class="logo">
                <span class="logo-text">ZenPose</span>
            </div>
            <nav class="nav-links">
                <a href="#" class="nav-link">Login</a>
                <a href="#" class="nav-link">Register</a>
            </nav>
        </div>
    `;
    
    return header;
}

