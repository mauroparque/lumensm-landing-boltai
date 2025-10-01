/**
 * Notification System Module
 * Handles toast notifications with different types
 */

export class NotificationSystem {
    constructor() {
        this.notifications = [];
    }

    /**
     * Show a notification
     * @param {string} message - Message to display
     * @param {string} type - Type: 'success', 'error', 'info', 'warning'
     * @param {Object} options - Additional options
     */
    show(message, type = 'info', options = {}) {
        // Remove existing notifications
        this.clearAll();

        const notification = this.create(message, type, options);
        document.body.appendChild(notification);
        this.notifications.push(notification);

        // Auto dismiss
        const duration = options.duration || 5000;
        if (duration > 0) {
            setTimeout(() => this.remove(notification), duration);
        }

        return notification;
    }

    /**
     * Create notification element
     */
    create(message, type, options) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        let html = `<span class="notification-message">${message}</span>`;

        if (options.action) {
            html += `<button class="notification-action" data-action="true">${options.action.text}</button>`;
        }

        html += `<button class="notification-close" aria-label="Cerrar notificación">&times;</button>`;

        notification.innerHTML = html;

        // Setup event listeners
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.remove(notification));

        const actionBtn = notification.querySelector('.notification-action');
        if (actionBtn && options.action?.callback) {
            actionBtn.addEventListener('click', () => {
                options.action.callback();
                this.remove(notification);
            });
        }

        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('notification-show');
        });

        return notification;
    }

    /**
     * Remove a notification
     */
    remove(notification) {
        notification.classList.remove('notification-show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    /**
     * Clear all notifications
     */
    clearAll() {
        this.notifications.forEach(n => this.remove(n));
    }
}

// Create singleton instance
const notificationSystem = new NotificationSystem();

/**
 * Show notification (shorthand)
 */
export function showNotification(message, type = 'info', options = {}) {
    return notificationSystem.show(message, type, options);
}

export default notificationSystem;
