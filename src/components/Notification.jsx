"use client"

const Notification = ({ notification, onMarkRead }) => {
    return (
        <div
            className={`p-6 rounded-xl border flex items-start gap-4 transition-colors hover:bg-surface-container-high relative group/item flex-col ${!notification.read
                ? 'bg-secondary-container/30 border-secondary-container/30'
                : 'bg-surface-container-low border-outline-variant/10'
                }`}
        >
            <div
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${!notification.read
                    ? 'bg-secondary-container/50'
                    : 'bg-surface-container-highest'
                    }`}
            >
                <span className={`material-symbols-outlined ${!notification.read
                    ? 'text-secondary'
                    : 'text-on-surface-variant'
                    }`}>
                    {notification.icon}
                </span>
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <p className={`font-semibold text-sm mb-0.5 ${!notification.read
                        ? 'text-on-secondary-container'
                        : 'text-on-surface'
                        }`}>
                        {notification.title}
                    </p>
                </div>

                <p className={`text-sm leading-relaxed ${!notification.read
                    ? 'text-on-secondary-container/80'
                    : 'text-on-surface-variant'
                    }`}>
                    {notification.message}
                </p>
            </div>

            {!notification.read && (
                <button
                    onClick={() => onMarkRead(notification.id)}
                    className="text-[10px] font-bold uppercase tracking-wider text-secondary hover:text-secondary-dim transition-colors flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full border border-secondary/20 mt-2"
                >
                    <span className="material-symbols-outlined text-[14px]">
                        check
                    </span>
                    Mark as read
                </button>
            )}
        </div>
    );
};

export default Notification;