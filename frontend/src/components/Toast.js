// Toast Notification System for ZenPose
class ToastManager {
    constructor() {
        this.container = null;
        this.currentToast = null;
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 12px;
                pointer-events: none;
                align-items: center;
                max-width: 400px;
                width: 100%;
            }

            .toast {
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95), rgba(236, 72, 153, 0.95));
                backdrop-filter: blur(20px);
                border: 2px solid transparent;
                background-clip: padding-box;
                border-radius: 20px 20px 20px 20px;
                padding: 20px 24px;
                color: white;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.4;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 0 30px rgba(59, 130, 246, 0.3);
                transform: translateY(-120px) scale(0.8);
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: auto;
                position: relative;
                overflow: hidden;
                min-width: 320px;
                max-width: 420px;
                animation: gradientShift 3s ease-in-out infinite;
            }

            .toast::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 20px 20px 20px 20px;
                padding: 2px;
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6));
                mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                mask-composite: exclude;
                animation: borderGlow 2s ease-in-out infinite;
            }

            .toast.show {
                transform: translateY(0) scale(1);
                opacity: 1;
            }

            .toast.hide {
                transform: translateY(-120px) scale(0.8);
                opacity: 0;
            }

            .toast.success {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(34, 197, 94, 0.95), rgba(59, 130, 246, 0.95));
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 0 30px rgba(16, 185, 129, 0.4);
            }

            .toast.success::before {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.8));
            }

            .toast.error {
                border-color: rgba(239, 68, 68, 0.6);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(239, 68, 68, 0.3);
            }

            .toast.warning {
                border-color: rgba(245, 158, 11, 0.6);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(245, 158, 11, 0.3);
            }

            .toast.info {
                border-color: rgba(59, 130, 246, 0.6);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.3);
            }

            .toast-content {
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }

            .toast-icon {
                font-size: 24px;
                flex-shrink: 0;
                margin-top: 2px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
            }

            .toast.success .toast-icon {
                color: #ffffff;
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(34, 197, 94, 0.3));
                animation: successPulse 2s ease-in-out infinite, iconGlow 3s ease-in-out infinite;
            }

            .toast.success .toast-icon::after {
                content: '';
                position: absolute;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
                border-radius: 50%;
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(34, 197, 94, 0.4));
                animation: pulseRing 2s ease-in-out infinite;
                z-index: -1;
            }

            .toast.error .toast-icon {
                color: #ef4444;
                animation: errorShake 0.5s ease-in-out;
            }

            .toast.warning .toast-icon {
                color: #f59e0b;
                animation: warningBounce 1s ease-in-out infinite;
            }

            .toast.info .toast-icon {
                color: #3b82f6;
                animation: infoFloat 2s ease-in-out infinite;
            }

            .toast-text {
                flex: 1;
                margin: 0;
            }

            .toast-title {
                font-weight: 700;
                font-size: 16px;
                margin-bottom: 6px;
                color: white;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                animation: titleSlideIn 0.6s ease-out;
            }

            .toast-message {
                color: rgba(255, 255, 255, 0.95);
                font-size: 14px;
                line-height: 1.5;
                animation: messageTypeIn 0.8s ease-out 0.2s both;
            }

            .toast-close {
                position: absolute;
                top: 12px;
                right: 12px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
            }

            .toast-close:hover {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                transform: scale(1.1);
            }

            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, rgba(16, 185, 129, 0.8), rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.8));
                border-radius: 0 0 20px 20px;
                width: 100%;
                transform: scaleX(1);
                transform-origin: left;
                animation: progressFill 5s linear forwards;
            }

            .toast.success .toast-progress {
                background: linear-gradient(90deg, rgba(16, 185, 129, 0.9), rgba(34, 197, 94, 0.9), rgba(59, 130, 246, 0.9));
            }

            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            @keyframes borderGlow {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }

            @keyframes successPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.15); }
            }

            @keyframes iconGlow {
                0%, 100% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.3); }
                50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.6), 0 0 30px rgba(34, 197, 94, 0.4); }
            }

            @keyframes pulseRing {
                0% { transform: scale(0.8); opacity: 1; }
                100% { transform: scale(1.4); opacity: 0; }
            }

            @keyframes titleSlideIn {
                0% { transform: translateX(-20px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }

            @keyframes messageTypeIn {
                0% { transform: translateY(10px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }

            @keyframes progressFill {
                0% { transform: scaleX(1); }
                100% { transform: scaleX(0); }
            }

            @keyframes confettiBurst {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
            }

            @keyframes errorShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
            }

            @keyframes warningBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
            }

            @keyframes infoFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-2px) rotate(5deg); }
            }

            @keyframes doorClose {
                0% { transform: rotateY(0deg) scale(1); }
                50% { transform: rotateY(-45deg) scale(0.9); }
                100% { transform: rotateY(-90deg) scale(0.8); }
            }

            @keyframes iconFadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }

            @keyframes slideOutDoor {
                0% { transform: translateY(0) scale(1); opacity: 1; }
                50% { transform: translateY(-20px) scale(0.95); opacity: 0.8; }
                100% { transform: translateY(-100px) scale(0.8); opacity: 0; }
            }

            @keyframes messageFadeOut {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }

            .toast:hover {
                transform: translateY(-5px) scale(1.02);
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(139, 92, 246, 0.3);
            }

            @media (max-width: 768px) {
                .toast-container {
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    transform: none;
                }
                .toast {
                    min-width: auto;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    show(options) {
        const { title = '', message = '', type = 'info', duration = 4000, icon = this.getDefaultIcon(type) } = options;

        // If there's already a toast showing, remove it immediately
        if (this.currentToast) {
            this.removeCurrentToastImmediately();
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${icon}</div>
                <div class="toast-text">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    <div class="toast-message">${message}</div>
                </div>
            </div>
            <div class="toast-progress"></div>
            <button class="toast-close" onclick="toastManager.remove(this.parentElement)">×</button>
        `;

        this.container.appendChild(toast);
        this.currentToast = toast;

        // Show the new toast immediately
        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add('show');
            }
        }, 10);

        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }

        return toast;
    }

    removeCurrentToastImmediately() {
        if (this.currentToast) {
            // Remove immediately without animation to prevent stacking
            if (this.currentToast.parentElement) {
                this.currentToast.parentElement.removeChild(this.currentToast);
            }
            this.currentToast = null;
        }
    }

    removeCurrentToast() {
        if (this.currentToast) {
            this.currentToast.classList.add('hide');
            setTimeout(() => {
                if (this.currentToast && this.currentToast.parentElement) {
                    this.currentToast.parentElement.removeChild(this.currentToast);
                }
                this.currentToast = null;
            }, 400);
        }
    }

    remove(toast) {
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
            // Clear current toast reference if this was the current one
            if (this.currentToast === toast) {
                this.currentToast = null;
            }
        }, 400);
    }

    clearAll() {
        // Remove current toast if exists
        if (this.currentToast) {
            this.removeCurrentToastImmediately();
        }
        
        // Clear any remaining toasts in container immediately
        const toasts = this.container.querySelectorAll('.toast');
        toasts.forEach(toast => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        });
    }

    getDefaultIcon(type) {
        const icons = {
            success: '🔓',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    success(message, title = 'Success!') {
        return this.show({ title, message, type: 'success', icon: '🎉' });
    }

    error(message, title = 'Error!') {
        return this.show({ title, message, type: 'error', icon: '💥' });
    }

    warning(message, title = 'Warning!') {
        return this.show({ title, message, type: 'warning', icon: '⚠️' });
    }

    info(message, title = 'Info') {
        return this.show({ title, message, type: 'info', icon: 'ℹ️' });
    }

    loginSuccess() {
        const toast = this.show({ 
            title: '🔓 Login Successful', 
            message: 'Welcome back! Let\'s pick up where you left off.', 
            type: 'success', 
            icon: '🔓',
            duration: 5000
        });
        
        // Add confetti burst effect
        this.addConfettiEffect(toast);
        return toast;
    }

    addConfettiEffect(toast) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
            animation: confettiBurst 1s ease-out forwards;
        `;
        
        // Create multiple confetti pieces
        for (let i = 0; i < 8; i++) {
            const piece = confetti.cloneNode();
            piece.style.transform = `rotate(${i * 45}deg) translateY(-30px)`;
            piece.style.animationDelay = `${i * 0.1}s`;
            toast.appendChild(piece);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            const pieces = toast.querySelectorAll('[style*="confettiBurst"]');
            pieces.forEach(piece => piece.remove());
        }, 1000);
    }

    signupSuccess() {
        return this.success('Account created successfully! 🎊 Welcome to ZenPose!', 'Welcome!');
    }

    sessionStarted() {
        return this.success('Your yoga session has begun! 🌟 Find your inner peace.', 'Session Started!');
    }

    accountDeleted() {
        return this.info('Account deleted successfully. Thank you for using ZenPose! 🧘‍♀️', 'Goodbye!');
    }

    // Additional ZenPose-specific notifications
    tabSwitched(tabName) {
        return this.info(`Switched to ${tabName}`, 'Navigation');
    }

    featureComingSoon(feature) {
        return this.info(`${feature} coming soon! 🚀`, 'Coming Soon');
    }

    actionCancelled(action) {
        return this.info(`${action} cancelled.`, 'Cancelled');
    }

    actionCompleted(action) {
        return this.success(`${action} completed successfully!`, 'Success');
    }

    welcomeBack(userName) {
        const toast = this.show({ 
            title: '🌟 Welcome Back!', 
            message: `Welcome back, ${userName}! Ready to continue your journey?`, 
            type: 'success', 
            icon: '🌟',
            duration: 5000
        });
        
        // Add subtle glow effect for welcome back
        toast.style.animation = 'gradientShift 3s ease-in-out infinite, borderGlow 2s ease-in-out infinite';
        return toast;
    }

    logoutSuccess() {
        const toast = this.show({ 
            title: '🚪 Logout Successful', 
            message: 'Session ended. Stay safe!', 
            type: 'info', 
            icon: '🚪',
            duration: 4000
        });
        
        // Add door closing animation
        this.addDoorClosingEffect(toast);
        return toast;
    }

    addDoorClosingEffect(toast) {
        // Add door closing animation to the icon
        const icon = toast.querySelector('.toast-icon');
        if (icon) {
            icon.style.animation = 'doorClose 2s ease-in-out forwards, iconFadeOut 3s ease-in-out 1s forwards';
        }
        
        // Add slide-out effect to the entire toast
        toast.style.animation = 'gradientShift 3s ease-in-out infinite, borderGlow 2s ease-in-out infinite, slideOutDoor 4s ease-in-out 2s forwards';
        
        // Add subtle fade effect to the message
        const message = toast.querySelector('.toast-message');
        if (message) {
            message.style.animation = 'messageTypeIn 0.8s ease-out 0.2s both, messageFadeOut 2s ease-in-out 2s forwards';
        }
    }
}

window.toast = new ToastManager();
export default window.toast;
