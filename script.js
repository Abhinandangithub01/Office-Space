/* ========================================
   OFFICE SPACE INTRANET PORTAL
   Complete JavaScript functionality for all widgets
   ======================================== */

// ========================================
// GLOBAL VARIABLES AND CONFIGURATION
// ========================================

/**
 * Global engagement data tracking
 * Stores user interaction statistics and counters
 */
let engagementData = {
    teamShares: 47,          // Number of social media shares by team
    totalReach: 234,         // Total social media reach
    activeReferrals: 3,      // Active employee referrals
    remainingHolidayDays: 12, // Remaining vacation days
    pendingRequests: 3       // Pending holiday requests
};

/**
 * Notification system counters
 */
let notificationCount = 3; // Current notification count

// ========================================
// APPLICATION INITIALIZATION
// ========================================

/**
 * Main application initialization
 * Called when DOM content is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Office Space Intranet Portal initializing...');
    
    try {
        // Initialize all core systems
        initializeNotifications();
        initializeWidgets();
        initializeInteractions();
        updateDateTime();
        setupKeyboardShortcuts();
        
        // Start real-time update systems after delay
        setTimeout(simulateRealTimeUpdates, 5000);
        
        console.log('✅ Office Space Intranet Portal loaded successfully!');
        logKeyboardShortcuts();
        
        // Show welcome notification after brief delay
        setTimeout(() => {
            showNotification('Welcome to Office Space Intranet! 🏢', 'success');
        }, 1500);
        
    } catch (error) {
        console.error('❌ Initialization error:', error);
        showNotification('Application initialization failed. Please refresh the page.', 'error');
    }
});

/**
 * Log available keyboard shortcuts to console
 */
function logKeyboardShortcuts() {
    console.log('⌨️ Available keyboard shortcuts:');
    console.log('   Alt + H: Quick Holiday Request');
    console.log('   Alt + S: Open IT Support');
    console.log('   Alt + N: View Notifications');
    console.log('   Alt + M: Refresh Meeting Rooms');
}

// ========================================
// WIDGET INITIALIZATION FUNCTIONS
// ========================================

/**
 * Initialize all widget functionality
 * Sets up event listeners and interactive features
 */
function initializeWidgets() {
    console.log('📊 Initializing widgets...');
    
    // Initialize individual widget systems
    initializeBirthdayWishes();
    initializeHolidayRequests();
    initializeSupportSystem();
    initializeSocialSharing();
    initializeResourceLinks();
    
    console.log('✅ All widgets initialized');
}

/**
 * Initialize birthday wish functionality
 * Handles sending birthday wishes to colleagues
 */
function initializeBirthdayWishes() {
    const wishButtons = document.querySelectorAll('.wish-btn');
    
    wishButtons.forEach(button => {
        button.addEventListener('click', function() {
            const birthdayItem = this.closest('.birthday-item');
            const nameElement = birthdayItem.querySelector('h4');
            
            if (!nameElement) {
                console.error('Birthday name element not found');
                return;
            }
            
            const name = nameElement.textContent;
            
            // Animate button with scaling and color change
            this.style.transform = 'scale(1.3)';
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = 'var(--success-color)';
            this.disabled = true; // Prevent double-clicking
            
            // Reset button after animation and show success
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                showNotification(`🎉 Birthday wish sent to ${name}! 🎂`, 'success');
                
                // Re-enable button after delay
                setTimeout(() => {
                    this.disabled = false;
                    this.innerHTML = '<i class="fas fa-gift"></i>';
                    this.style.background = 'var(--primary-color)';
                }, 2000);
            }, 400);
        });
    });
}

/**
 * Initialize holiday request system
 * Handles time-off requests with loading states
 */
function initializeHolidayRequests() {
    const holidayBtn = document.querySelector('.request-holiday-btn');
    
    if (holidayBtn) {
        holidayBtn.addEventListener('click', function() {
            // Store original button state
            const originalText = this.innerHTML;
            
            // Set loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            this.style.opacity = '0.7';
            
            // Simulate API call with realistic delay
            setTimeout(() => {
                // Restore button state
                this.innerHTML = originalText;
                this.disabled = false;
                this.style.opacity = '1';
                
                // Update pending requests counter
                updatePendingRequests();
                
                showNotification('✅ Holiday request submitted successfully! 📅', 'success');
            }, 2000);
        });
    }
}

/**
 * Initialize IT support system
 * Handles different types of support requests
 */
function initializeSupportSystem() {
    const supportButtons = document.querySelectorAll('.support-btn');
    
    supportButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Determine support type from button icon
            const supportType = getSupportType(this);
            
            // Add visual feedback with scale animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                showNotification(`🎫 ${supportType} form opened!`, 'info');
            }, 150);
        });
    });
}

/**
 * Get support type based on button icon
 * @param {HTMLElement} button - Support button element
 * @returns {string} Support type description
 */
function getSupportType(button) {
    const icon = button.querySelector('i');
    
    if (icon && icon.classList.contains('fa-bug')) {
        return 'Bug Report';
    } else if (icon && icon.classList.contains('fa-question-circle')) {
        return 'Help Request';
    } else if (icon && icon.classList.contains('fa-laptop')) {
        return 'Hardware Request';
    }
    
    return 'General Support';
}

/**
 * Initialize social media sharing functionality
 * Handles platform-specific sharing with engagement tracking
 */
function initializeSocialSharing() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('linkedin') ? 'LinkedIn' : 'Twitter';
            
            // Add pulse animation to button
            this.style.animation = 'pulse 0.3s ease-in-out';
            
            setTimeout(() => {
                this.style.animation = '';
                showNotification(`🚀 Shared on ${platform}! Thanks for spreading the word! 📱`, 'success');
                
                // Update engagement statistics
                updateEngagementStats();
            }, 300);
        });
    });
}

/**
 * Initialize resource links functionality
 * Handles access to company resources and documents
 */
function initializeResourceLinks() {
    const resourceLinks = document.querySelectorAll('.resource-link');
    
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add subtle click animation
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                
                const resourceName = this.querySelector('span').textContent;
                showNotification(`📖 Opening ${resourceName}...`, 'info');
            }, 150);
        });
    });
}

// ========================================
// INTERACTIVE FEATURES AND ANIMATIONS
// ========================================

/**
 * Initialize general interactive features
 * Sets up hover effects and view-all button functionality
 */
function initializeInteractions() {
    setupWidgetHoverEffects();
    setupViewAllButtons();
}

/**
 * Setup hover effects for all widgets
 */
function setupWidgetHoverEffects() {
    const widgets = document.querySelectorAll('.widget');
    
    widgets.forEach(widget => {
        widget.addEventListener('mouseenter', function() {
            if (!this.classList.contains('welcome-widget')) {
                this.style.transform = 'translateY(-6px)';
            }
        });
        
        widget.addEventListener('mouseleave', function() {
            if (!this.classList.contains('welcome-widget')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

/**
 * Setup view-all button functionality
 */
function setupViewAllButtons() {
    const viewAllButtons = document.querySelectorAll('.view-all-btn');
    
    viewAllButtons.forEach(button => {
        button.addEventListener('click', function() {
            const widgetHeader = this.closest('.widget-header');
            const titleElement = widgetHeader ? widgetHeader.querySelector('h3') : null;
            const widgetTitle = titleElement ? titleElement.textContent.trim() : 'Unknown Widget';
            
            showNotification(`📋 Opening full ${widgetTitle} view...`, 'info');
        });
    });
}

/**
 * Update current date and time in welcome message
 */
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const formattedDate = now.toLocaleDateString('en-US', options);
    const welcomeMessage = document.getElementById('welcome-message');
    
    if (welcomeMessage) {
        welcomeMessage.textContent = 
            `Today is ${formattedDate}. You have 3 pending tasks and 2 upcoming meetings.`;
    }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

/**
 * Initialize notification container
 * Creates the notification display area if it doesn't exist
 */
function initializeNotifications() {
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        
        console.log('📢 Notification system initialized');
    }
}

/**
 * Show notification with type-specific styling
 * @param {string} message - Notification message to display
 * @param {string} type - Notification type: success, error, warning, info
 */
function showNotification(message, type = 'info') {
    const container = document.querySelector('.notification-container');
    
    if (!container) {
        console.error('Notification container not found');
        return;
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set type-specific styling
    const colors = {
        success: '#059669',
        error: '#dc2626',
        warning: '#d97706',
        info: '#2563eb'
    };
    
    notification.style.cssText = `
        background: white;
        color: #1e293b;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        transform: translateX(400px);
        transition: all 0.3s ease;
        pointer-events: auto;
        cursor: pointer;
        font-weight: 500;
        max-width: 350px;
        word-wrap: break-word;
        border-left: 4px solid ${colors[type] || colors.info};
        border: 1px solid #e2e8f0;
    `;
    
    // Add notification to container
    container.appendChild(notification);
    
    // Trigger slide-in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 4 seconds
    const autoRemoveTimer = setTimeout(() => {
        removeNotification(notification);
    }, 4000);
    
    // Add click-to-dismiss functionality
    notification.addEventListener('click', function() {
        clearTimeout(autoRemoveTimer);
        removeNotification(this);
    });
}

/**
 * Remove notification with slide-out animation
 * @param {HTMLElement} notification - Notification element to remove
 */
function removeNotification(notification) {
    if (!notification || !notification.parentNode) return;
    
    // Trigger slide-out animation
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ========================================
// DATA UPDATES AND STATISTICS
// ========================================

/**
 * Update social media engagement statistics
 * Simulates real-time engagement tracking
 */
function updateEngagementStats() {
    const teamSharesEl = document.getElementById('team-shares');
    const totalReachEl = document.getElementById('total-reach');
    
    if (teamSharesEl && totalReachEl) {
        // Increment team shares
        engagementData.teamShares++;
        teamSharesEl.textContent = engagementData.teamShares;
        
        // Increment total reach with realistic random increase
        const reachIncrease = Math.floor(Math.random() * 15) + 5;
        engagementData.totalReach += reachIncrease;
        totalReachEl.textContent = engagementData.totalReach;
        
        // Animate the updated statistics
        animateStatUpdate(teamSharesEl);
        animateStatUpdate(totalReachEl);
        
        console.log(`📊 Engagement updated: ${engagementData.teamShares} shares, ${engagementData.totalReach} reach`);
    }
}

/**
 * Update pending holiday requests counter
 */
function updatePendingRequests() {
    const pendingEl = document.getElementById('pending-requests');
    
    if (pendingEl) {
        engagementData.pendingRequests++;
        pendingEl.textContent = engagementData.pendingRequests;
        animateStatUpdate(pendingEl);
        
        console.log(`📅 Pending requests updated: ${engagementData.pendingRequests}`);
    }
}

/**
 * Animate statistic updates with visual feedback
 * @param {HTMLElement} element - Element to animate
 */
function animateStatUpdate(element) {
    if (!element) return;
    
    // Scale up and change color
    element.style.transform = 'scale(1.2)';
    element.style.color = '#059669';
    element.style.transition = 'all 0.3s ease';
    
    // Reset to original state
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '#2563eb';
    }, 500);
}

// ========================================
// REAL-TIME UPDATES SIMULATION
// ========================================

/**
 * Simulate real-time updates for various system components
 */
function simulateRealTimeUpdates() {
    console.log('🔄 Starting real-time update simulation');
    
    // Simulate notification updates every 45 seconds
    setInterval(() => {
        if (Math.random() < 0.4) { // 40% chance
            notificationCount++;
            updateNotificationBadge();
            animateNotificationBell();
        }
    }, 45000);

    // Simulate meeting room status changes every 2 minutes
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            simulateRoomStatusChange();
        }
    }, 120000);
}

/**
 * Update notification badge count with animation
 */
function updateNotificationBadge() {
    const badge = document.querySelector('.notification-count');
    
    if (badge) {
        badge.textContent = notificationCount;
        
        // Animate badge update
        badge.style.transform = 'scale(1.3)';
        badge.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 200);
    }
}

/**
 * Animate notification bell for new notifications
 */
function animateNotificationBell() {
    const bell = document.querySelector('.notification-bell');
    
    if (bell) {
        bell.style.animation = 'pulse 0.6s ease-in-out';
        
        setTimeout(() => {
            bell.style.animation = '';
        }, 600);
    }
}

/**
 * Simulate meeting room status changes
 */
function simulateRoomStatusChange() {
    const roomItems = document.querySelectorAll('.room-item');
    
    if (roomItems.length === 0) return;
    
    // Select random room to update
    const randomRoom = roomItems[Math.floor(Math.random() * roomItems.length)];
    const statusBadge = randomRoom.querySelector('.status-badge');
    const bookBtn = randomRoom.querySelector('.book-room-btn');
    
    if (!statusBadge || !bookBtn) return;
    
    if (randomRoom.classList.contains('available')) {
        // Change to busy
        randomRoom.classList.remove('available');
        randomRoom.classList.add('busy');
        statusBadge.textContent = 'Busy until 4:00 PM';
        statusBadge.classList.remove('available');
        statusBadge.classList.add('busy');
        bookBtn.innerHTML = '<i class="fas fa-clock"></i> Wait';
        bookBtn.disabled = true;
        bookBtn.classList.add('disabled');
    } else {
        // Change to available
        randomRoom.classList.remove('busy');
        randomRoom.classList.add('available');
        statusBadge.textContent = 'Available Now';
        statusBadge.classList.remove('busy');
        statusBadge.classList.add('available');
        bookBtn.innerHTML = '<i class="fas fa-calendar-plus"></i> Book';
        bookBtn.disabled = false;
        bookBtn.classList.remove('disabled');
    }
    
    showNotification('Meeting room availability updated! 🏢', 'info');
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

/**
 * Setup keyboard shortcuts for power users
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt + H for Holiday Request
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            const holidayBtn = document.querySelector('.request-holiday-btn');
            if (holidayBtn && !holidayBtn.disabled) {
                holidayBtn.click();
                showNotification('Keyboard shortcut: Holiday Request! ⌨️', 'info');
            }
        }
        
        // Alt + S for IT Support
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            const supportBtn = document.querySelector('.support-btn');
            if (supportBtn) {
                supportBtn.click();
                showNotification('Keyboard shortcut: IT Support! ⌨️', 'info');
            }
        }
        
        // Alt + N for Notifications
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            toggleNotifications();
            showNotification('Keyboard shortcut: Notifications! ⌨️', 'info');
        }
        
        // Alt + M for Meeting Rooms
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            refreshRoomStatus();
            showNotification('Keyboard shortcut: Meeting Rooms! ⌨️', 'info');
        }
    });
}

// ========================================
// CLICK HANDLER FUNCTIONS (Global Functions)
// ========================================

/**
 * Handle notification bell click
 */
function toggleNotifications() {
    const bell = document.querySelector('.notification-bell');
    
    if (bell) {
        // Reset notification count
        notificationCount = 0;
        updateNotificationBadge();
        
        // Animate bell
        bell.style.transform = 'scale(1.1)';
        setTimeout(() => {
            bell.style.transform = 'scale(1)';
        }, 200);
    }
    
    showNotification('Notifications panel opened! 🔔', 'info');
}

/**
 * Handle user avatar click
 */
function toggleUserMenu() {
    showNotification('User profile menu opened! 👤', 'info');
}

/**
 * Handle schedule new meeting
 */
function scheduleNewMeeting() {
    showNotification('Meeting scheduler opened! 📅', 'info');
}

/**
 * Handle view all tasks
 */
function viewAllTasks() {
    showNotification('Task management system opened! ✅', 'info');
}

/**
 * Handle view all events
 */
function viewAllEvents() {
    showNotification('Full events calendar opened! 📅', 'info');
}

/**
 * Handle birthday wish sending
 * @param {string} name - Name of the birthday person
 */
function sendBirthdayWish(name) {
    showNotification(`🎉 Birthday wish sent to ${name}! 🎂`, 'success');
}

/**
 * Handle holiday time off request
 */
function requestTimeOff() {
    // This is handled by the initialized event listener
    const holidayBtn = document.querySelector('.request-holiday-btn');
    if (holidayBtn && !holidayBtn.disabled) {
        holidayBtn.click();
    }
}

/**
 * Handle IT issue reporting
 */
function reportIssue() {
    showNotification('Bug report form opened! 🐛', 'warning');
}

/**
 * Handle help request
 */
function getHelp() {
    showNotification('Help desk contacted! 🆘', 'info');
}

/**
 * Handle hardware request
 */
function requestHardware() {
    showNotification('Hardware request form opened! 💻', 'info');
}

/**
 * Handle view all news
 */
function viewAllNews() {
    showNotification('Company news center opened! 📰', 'info');
}

/**
 * Handle social media platform sharing
 * @param {string} platform - Social media platform name
 */
function shareOnPlatform(platform) {
    showNotification(`🚀 Shared on ${platform}! Thanks for spreading the word! 📱`, 'success');
    updateEngagementStats();
}

/**
 * Handle resource link opening
 * @param {string} resourceName - Name of the resource
 */
function openResource(resourceName) {
    showNotification(`📖 Opening ${resourceName}...`, 'info');
}

/**
 * Handle meeting room booking
 * @param {string} roomName - Name of the room to book
 */
function bookRoom(roomName) {
    showNotification(`🏢 Booking ${roomName}...`, 'success');
    
    // Simulate booking process
    setTimeout(() => {
        showNotification(`✅ ${roomName} booked successfully!`, 'success');
    }, 1500);
}

/**
 * Handle quick time slot booking
 * @param {string} timeSlot - Time slot to book
 */
function quickBook(timeSlot) {
    showNotification(`⏰ Booking room for ${timeSlot}...`, 'info');
}

/**
 * Handle room status refresh
 */
function refreshRoomStatus() {
    const refreshBtn = document.querySelector('.refresh-btn');
    
    if (refreshBtn) {
        // Animate refresh button
        refreshBtn.style.transform = 'rotate(360deg)';
        refreshBtn.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            refreshBtn.style.transform = 'rotate(0deg)';
        }, 500);
    }
    
    setTimeout(() => {
        showNotification('Room availability refreshed! 🔄', 'success');
    }, 500);
}

/**
 * Handle interview schedule viewing
 */
function viewInterviewSchedule() {
    showNotification('Full interview schedule opened! 👔', 'info');
}

/**
 * Handle resume viewing
 * @param {string} candidateName - Name of the candidate
 */
function viewResume(candidateName) {
    showNotification(`📄 Opening ${candidateName}'s resume...`, 'info');
}

/**
 * Handle joining interview
 * @param {string} candidateName - Name of the candidate
 */
function joinInterview(candidateName) {
    showNotification(`🎥 Joining interview with ${candidateName}...`, 'success');
}

/**
 * Handle adding new referral
 */
function addNewReferral() {
    showNotification('Employee referral form opened! 👥', 'info');
}

// ========================================
// ERROR HANDLING AND DEBUGGING
// ========================================

/**
 * Global error handler for debugging
 */
window.addEventListener('error', function(e) {
    console.error('Office Space Intranet Error:', e.error);
    showNotification('An error occurred. Please refresh the page. ⚠️', 'error');
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showNotification('A system error occurred. Please try again. ⚠️', 'error');
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

/**
 * Log performance metrics
 */
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`📊 Page load time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
    }
});

console.log('🚀 Office Space Intranet JavaScript loaded and ready!');
